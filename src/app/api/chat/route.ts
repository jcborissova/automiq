import OpenAI from "openai";
import type { NextRequest } from "next/server";
import { buildSystemPrompt, HANDOFF_TOOL } from "../../lib/chat-prompt";
import type { Locale } from "../../lib/site-content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Lightweight knobs — keep cost predictable
const MODEL = "gpt-4o-mini";
const MAX_TOKENS = 300;
const TEMPERATURE = 0.4;

// Conversation/session caps
const MAX_MESSAGES_PER_REQUEST = 18; // ≤ 9 user + 9 assistant turns sent in one request
const MAX_TOTAL_CHARS = 4000;

// Browser-level daily rate limit (cookie-based)
const RATE_COOKIE_NAME = "automiq-chat-quota";
const RATE_LIMIT_MAX = 25; // total chat calls per browser per window
const RATE_LIMIT_WINDOW_MS = 24 * 60 * 60 * 1000;

type IncomingMessage = {
  role: "user" | "assistant";
  content: string;
};

type IncomingBody = {
  messages: IncomingMessage[];
  locale: Locale;
};

type Quota = {
  count: number;
  resetAt: number;
};

function isValidMessage(m: unknown): m is IncomingMessage {
  if (!m || typeof m !== "object") return false;
  const msg = m as Record<string, unknown>;
  return (
    (msg.role === "user" || msg.role === "assistant") &&
    typeof msg.content === "string" &&
    msg.content.trim().length > 0
  );
}

function readQuota(req: NextRequest): Quota {
  const now = Date.now();
  const fresh: Quota = { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };
  const raw = req.cookies.get(RATE_COOKIE_NAME)?.value;
  if (!raw) return fresh;
  try {
    const decoded = JSON.parse(Buffer.from(raw, "base64").toString("utf-8"));
    if (
      typeof decoded.count === "number" &&
      typeof decoded.resetAt === "number" &&
      decoded.resetAt > now
    ) {
      return { count: decoded.count, resetAt: decoded.resetAt };
    }
  } catch {
    // fall through to fresh
  }
  return fresh;
}

function buildQuotaCookie(q: Quota): string {
  const value = Buffer.from(JSON.stringify(q)).toString("base64");
  const maxAge = Math.max(1, Math.floor((q.resetAt - Date.now()) / 1000));
  const parts = [
    `${RATE_COOKIE_NAME}=${value}`,
    "Path=/",
    `Max-Age=${maxAge}`,
    "HttpOnly",
    "SameSite=Lax",
  ];
  if (process.env.NODE_ENV === "production") parts.push("Secure");
  return parts.join("; ");
}

export async function POST(req: NextRequest) {
  // Rate limit before anything else (saves tokens)
  const quota = readQuota(req);
  if (quota.count >= RATE_LIMIT_MAX) {
    return new Response(
      JSON.stringify({
        error: "rate_limit",
        resetAt: quota.resetAt,
      }),
      {
        status: 429,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  let body: IncomingBody;
  try {
    body = (await req.json()) as IncomingBody;
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const { messages, locale } = body;
  const safeLocale: Locale = locale === "en" ? "en" : "es";

  if (
    !Array.isArray(messages) ||
    messages.length === 0 ||
    messages.length > MAX_MESSAGES_PER_REQUEST
  ) {
    return new Response("Invalid messages", { status: 400 });
  }
  if (!messages.every(isValidMessage)) {
    return new Response("Invalid message shape", { status: 400 });
  }
  if (messages[0].role !== "user") {
    return new Response("First message must be user", { status: 400 });
  }
  const totalChars = messages.reduce((acc, m) => acc + m.content.length, 0);
  if (totalChars > MAX_TOTAL_CHARS) {
    return new Response("Conversation too long", { status: 413 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return new Response("Server misconfigured: OPENAI_API_KEY missing", { status: 500 });
  }

  // Reserve quota slot before calling the model
  const newQuota: Quota = { count: quota.count + 1, resetAt: quota.resetAt };
  const setCookie = buildQuotaCookie(newQuota);

  const client = new OpenAI();

  const stream = await client.chat.completions.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    temperature: TEMPERATURE,
    stream: true,
    messages: [
      { role: "system", content: buildSystemPrompt(safeLocale) },
      ...messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    ],
    tools: [
      {
        type: "function",
        function: {
          name: HANDOFF_TOOL.name,
          description: HANDOFF_TOOL.description,
          parameters: HANDOFF_TOOL.input_schema,
        },
      },
    ],
  });

  const encoder = new TextEncoder();

  const sse = new ReadableStream({
    async start(controller) {
      const send = (payload: unknown) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
      };

      const toolBuffers = new Map<number, { name?: string; args: string }>();

      try {
        for await (const chunk of stream) {
          const choice = chunk.choices[0];
          if (!choice) continue;
          const delta = choice.delta;

          if (delta.content) {
            send({ type: "text", text: delta.content });
          }

          if (delta.tool_calls) {
            for (const tc of delta.tool_calls) {
              const idx = tc.index;
              const buf = toolBuffers.get(idx) ?? { args: "" };
              if (tc.function?.name) buf.name = tc.function.name;
              if (tc.function?.arguments) buf.args += tc.function.arguments;
              toolBuffers.set(idx, buf);
            }
          }
        }

        for (const buf of toolBuffers.values()) {
          if (buf.name === "handoff_to_whatsapp" && buf.args) {
            try {
              const parsed = JSON.parse(buf.args);
              send({ type: "handoff", input: parsed });
            } catch {
              // ignore malformed tool args
            }
          }
        }

        send({
          type: "done",
          quota: { remaining: RATE_LIMIT_MAX - newQuota.count, resetAt: newQuota.resetAt },
        });
      } catch (err) {
        console.error("[chat] stream error:", err);
        send({ type: "error" });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(sse, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
      "Set-Cookie": setCookie,
    },
  });
}
