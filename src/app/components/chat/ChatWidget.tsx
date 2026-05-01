"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp, X } from "lucide-react";
import { BrandMark } from "../BrandLogo";
import { getLocaleFromPathname, type Locale } from "../../lib/site-content";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  role: ChatRole;
  content: string;
};

type HandoffPayload = {
  summary?: string;
  user_intent?: string;
  lead_quality?: string;
};

const WHATSAPP_NUMBER = "18297071293";
const NUDGE_DISMISSED_KEY = "automiq:nudge-dismissed";
const NUDGE_FIRST_DELAY_MS = 7000;
const NUDGE_ROTATE_MS = 28000;
const MAX_USER_MESSAGES = 8;

type Copy = {
  title: string;
  status: string;
  subtitle: string;
  placeholder: string;
  placeholderCapped: string;
  greeting: string;
  greetingIntro: string;
  quickReplies: string[];
  whatsappCta: string;
  open: string;
  close: string;
  closeNudge: string;
  errorNetwork: string;
  errorServer: string;
  errorRateLimit: string;
  poweredBy: string;
  send: string;
  nudgeLabel: string;
  nudges: string[];
  limitNotice: string;
  limitFallbackSummary: string;
};

const COPY: Record<Locale, Copy> = {
  es: {
    title: "Tomy · AutomIQ",
    status: "En línea ahora",
    subtitle: "Respuesta inmediata",
    placeholder: "Escribe tu mensaje…",
    placeholderCapped: "Conversación cerrada · continúa por WhatsApp",
    greetingIntro: "Hola, soy Tomy, el asistente de AutomIQ.",
    greeting:
      "¿En qué proceso de tu operación quieres ahorrar trabajo: automatización, agente IA, una app interna, o búsqueda sobre tus documentos?",
    quickReplies: [
      "Automatizar un proceso manual",
      "Quiero un agente IA para soporte",
      "Necesito una app interna a medida",
    ],
    whatsappCta: "Continuar por WhatsApp",
    open: "Hablar con Tomy",
    close: "Cerrar chat",
    closeNudge: "Cerrar mensaje",
    errorNetwork: "No pude conectar. Intenta de nuevo o continúa por WhatsApp.",
    errorServer: "Hubo un error procesando tu mensaje. Intenta de nuevo.",
    errorRateLimit:
      "Has llegado al límite de mensajes diarios. Continúa por WhatsApp y conversamos directo.",
    poweredBy: "Tomy es un asistente IA · Las respuestas pueden contener errores",
    send: "Enviar",
    nudgeLabel: "Tomy · AutomIQ",
    nudges: [
      "¿Tienes un proceso manual que quieras automatizar?",
      "Cuéntame tu caso · te respondo al instante.",
      "Pregúntame sobre agentes IA, automatización o apps a medida.",
    ],
    limitNotice:
      "Para profundizar en tu caso, conversemos directo por WhatsApp. Te respondo en minutos.",
    limitFallbackSummary:
      "Vengo del chat con Tomy en la web. Quiero seguir la conversación contigo.",
  },
  en: {
    title: "Tomy · AutomIQ",
    status: "Online now",
    subtitle: "Instant reply",
    placeholder: "Type your message…",
    placeholderCapped: "Conversation closed · continue on WhatsApp",
    greetingIntro: "Hi, I'm Tomy, AutomIQ's assistant.",
    greeting:
      "Which part of your operation do you want to free up: automation, an AI agent, an internal app, or knowledge search over your docs?",
    quickReplies: [
      "Automate a manual process",
      "I want an AI agent for support",
      "I need a custom internal app",
    ],
    whatsappCta: "Continue on WhatsApp",
    open: "Chat with Tomy",
    close: "Close chat",
    closeNudge: "Dismiss message",
    errorNetwork: "Could not connect. Try again or continue on WhatsApp.",
    errorServer: "Something went wrong. Please try again.",
    errorRateLimit:
      "You've reached today's message limit. Continue on WhatsApp and we'll chat directly.",
    poweredBy: "Tomy is an AI assistant · Answers may contain errors",
    send: "Send",
    nudgeLabel: "Tomy · AutomIQ",
    nudges: [
      "Got a manual process you'd like to automate?",
      "Tell me your case — I reply instantly.",
      "Ask me about AI agents, automation, or custom apps.",
    ],
    limitNotice:
      "To dig into your case, let's talk directly on WhatsApp. I'll reply in minutes.",
    limitFallbackSummary:
      "Coming from the chat with Tomy — I'd like to continue the conversation.",
  },
};

export default function ChatWidget() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const labels = COPY[locale];

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [handoff, setHandoff] = useState<HandoffPayload | null>(null);
  const [rateLimited, setRateLimited] = useState(false);
  const [nudgeIdx, setNudgeIdx] = useState<number | null>(null);
  const [nudgeDismissed, setNudgeDismissed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const userMessageCount = messages.filter((m) => m.role === "user").length;
  const conversationCapped = userMessageCount >= MAX_USER_MESSAGES;
  const inputDisabled = streaming || conversationCapped || rateLimited;

  const effectiveHandoff: HandoffPayload | null = useMemo(() => {
    if (handoff) return handoff;
    if (conversationCapped || rateLimited) {
      return { summary: labels.limitFallbackSummary };
    }
    return null;
  }, [handoff, conversationCapped, rateLimited, labels.limitFallbackSummary]);

  const whatsappLink = useMemo(() => {
    const summary = effectiveHandoff?.summary?.trim();
    const intro =
      locale === "es"
        ? "Hola, vengo del chat con Tomy en la web de AutomIQ."
        : "Hi, I came from chatting with Tomy on the AutomIQ website.";
    const text = summary ? `${intro}\n\n${summary}` : intro;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  }, [effectiveHandoff, locale]);

  // Hydrate dismissed state from sessionStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(NUDGE_DISMISSED_KEY) === "1") {
      setNudgeDismissed(true);
    }
  }, []);

  // First nudge appears after a delay if not dismissed and chat is closed
  useEffect(() => {
    if (nudgeDismissed || open) return;
    if (nudgeIdx !== null) return;
    const t = setTimeout(() => {
      setNudgeIdx(0);
    }, NUDGE_FIRST_DELAY_MS);
    return () => clearTimeout(t);
  }, [nudgeDismissed, open, nudgeIdx]);

  // Rotate to next nudge after a while; hide after the last
  useEffect(() => {
    if (nudgeIdx === null) return;
    const t = setTimeout(() => {
      setNudgeIdx((idx) => {
        if (idx === null) return null;
        const next = idx + 1;
        return next < labels.nudges.length ? next : null;
      });
    }, NUDGE_ROTATE_MS);
    return () => clearTimeout(t);
  }, [nudgeIdx, labels.nudges.length]);

  // Opening the chat dismisses the nudge for the rest of the session
  useEffect(() => {
    if (!open) return;
    setNudgeIdx(null);
    setNudgeDismissed(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(NUDGE_DISMISSED_KEY, "1");
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 220);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, streaming, handoff]);

  async function streamReply(history: ChatMessage[]) {
    setMessages([...history, { role: "assistant", content: "" }]);
    setStreaming(true);
    setHandoff(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, locale }),
      });

      if (res.status === 429) {
        setRateLimited(true);
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = { role: "assistant", content: labels.errorRateLimit };
          return next;
        });
        return;
      }

      if (!res.ok || !res.body) {
        throw new Error(`bad response: ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() ?? "";
        for (const part of parts) {
          const line = part.trim();
          if (!line.startsWith("data:")) continue;
          const json = line.slice(5).trim();
          if (!json) continue;
          let payload: { type: string; text?: string; input?: HandoffPayload };
          try {
            payload = JSON.parse(json);
          } catch {
            continue;
          }
          if (payload.type === "text" && typeof payload.text === "string") {
            setMessages((prev) => {
              const next = [...prev];
              const last = next[next.length - 1];
              next[next.length - 1] = { ...last, content: last.content + payload.text };
              return next;
            });
          } else if (payload.type === "handoff" && payload.input) {
            setHandoff(payload.input);
          } else if (payload.type === "error") {
            setMessages((prev) => {
              const next = [...prev];
              next[next.length - 1] = { role: "assistant", content: labels.errorServer };
              return next;
            });
          }
        }
      }
    } catch {
      setMessages((prev) => {
        const next = [...prev];
        const last = next[next.length - 1];
        if (last && last.role === "assistant" && last.content.length === 0) {
          next[next.length - 1] = { role: "assistant", content: labels.errorNetwork };
        } else {
          next.push({ role: "assistant", content: labels.errorNetwork });
        }
        return next;
      });
    } finally {
      setStreaming(false);
    }
  }

  function submitText(text: string) {
    const trimmed = text.trim();
    if (!trimmed || streaming || conversationCapped || rateLimited) return;
    const updated: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setInput("");
    void streamReply(updated);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    submitText(input);
  }

  function dismissNudge() {
    setNudgeIdx(null);
    setNudgeDismissed(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(NUDGE_DISMISSED_KEY, "1");
    }
  }

  const showQuickReplies = messages.length === 0 && !streaming;
  const nudgeVisible = nudgeIdx !== null && !open;

  return (
    <>
      {/* Proactive nudge bubble — speech bubble pointing toward the robot */}
      {nudgeVisible && (
        <div
          key={nudgeIdx}
          className="fixed bottom-[7rem] right-4 z-[80] max-w-[260px] lg:right-6"
          style={{ animation: "chat-nudge-in 320ms cubic-bezier(0.22,1,0.36,1) both" }}
        >
          <div className="relative">
            <button
              type="button"
              onClick={dismissNudge}
              aria-label={labels.closeNudge}
              className="absolute -top-2 -right-2 z-10 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--ink-950)] text-white shadow-[var(--shadow-md)] transition hover:bg-[var(--ink-900)]"
            >
              <X className="h-3 w-3" strokeWidth={2.5} />
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="relative block w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-left shadow-[var(--shadow-lg)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-xl)]"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                {labels.nudgeLabel}
              </p>
              <p className="mt-1 text-[13.5px] font-medium leading-snug text-[var(--ink-950)]">
                {labels.nudges[nudgeIdx!]}
              </p>
              {/* Speech tail — points down-right toward the robot */}
              <span
                aria-hidden
                className="absolute -bottom-1.5 right-7 h-3 w-3 rotate-45 border-b border-r border-[var(--border)] bg-[var(--surface)]"
              />
            </button>
          </div>
        </div>
      )}

      {/* Floating button with custom robot mascot */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? labels.close : labels.open}
        aria-expanded={open}
        className={`group fixed bottom-5 right-5 z-[80] inline-flex h-16 w-16 items-center justify-center rounded-full transition-all duration-300 active:scale-95 lg:bottom-6 lg:right-6 ${
          open
            ? "bg-[var(--ink-950)] text-white shadow-[0_18px_38px_-12px_rgba(2,6,23,0.55)] rotate-90"
            : "bg-[var(--ink-950)] shadow-[0_22px_44px_-12px_rgba(249,115,22,0.45)] hover:scale-[1.06] hover:shadow-[0_26px_52px_-12px_rgba(249,115,22,0.65)]"
        }`}
      >
        {/* Pulse ring (closed state) */}
        {!open && (
          <>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full bg-[var(--accent)]/45 animate-ping"
              style={{ animationDuration: "2.4s" }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-1 rounded-full ring-1 ring-[var(--accent)]/25"
            />
          </>
        )}
        {open ? (
          <X className="relative h-5 w-5" />
        ) : (
          <RobotMascot className="relative h-9 w-9" />
        )}
      </button>

      {/* Panel */}
      <div
        role="dialog"
        aria-label={labels.title}
        aria-hidden={!open}
        className={`fixed bottom-[6.25rem] right-3 z-[80] flex w-[calc(100%-1.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl bg-[var(--background)] shadow-[0_36px_72px_-24px_rgba(2,6,23,0.45),0_2px_8px_rgba(2,6,23,0.08)] ring-1 ring-black/5 transition-all duration-200 ease-out lg:bottom-24 lg:right-6 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
        style={{ height: "min(620px, calc(100dvh - 7rem))" }}
      >
        {/* Header — dark navy */}
        <header className="relative overflow-hidden bg-[var(--ink-950)] px-4 pt-4 pb-4 text-white">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-16 -right-12 h-40 w-40 rounded-full bg-[var(--accent)]/20 blur-3xl"
          />
          <div className="relative flex items-center gap-3">
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
              <BrandMark
                tone="orange"
                alt=""
                className="h-6 w-6 object-contain"
                sizes="24px"
              />
              <span
                aria-hidden
                className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[var(--ink-950)]"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-[14px] font-semibold leading-tight tracking-tight">
                {labels.title}
              </p>
              <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-white/65">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {labels.status}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={labels.close}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 space-y-4 overflow-y-auto bg-[var(--background)] px-4 py-5"
        >
          <AssistantMessage>
            <p className="text-[var(--ink-700)]">{labels.greetingIntro}</p>
            <p className="mt-1.5">{labels.greeting}</p>
          </AssistantMessage>

          {showQuickReplies && (
            <div className="flex flex-col gap-2 pl-10">
              {labels.quickReplies.map((reply) => (
                <button
                  key={reply}
                  type="button"
                  onClick={() => submitText(reply)}
                  className="text-left text-[13px] font-medium text-[var(--ink-800)] rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 transition hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/5 hover:text-[var(--ink-950)]"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {messages.map((m, i) => {
            if (m.role === "user") {
              return <UserBubble key={i} content={m.content} />;
            }
            const isLastAssistant = i === messages.length - 1;
            return (
              <AssistantMessage key={i}>
                {m.content || (isLastAssistant && streaming ? <TypingDots /> : null)}
              </AssistantMessage>
            );
          })}

          {(conversationCapped || rateLimited) && !handoff && (
            <AssistantMessage>
              <p className="text-[var(--ink-700)]">{labels.limitNotice}</p>
            </AssistantMessage>
          )}

          {effectiveHandoff && (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-10 flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-[13px] font-semibold text-white shadow-[var(--shadow-md)] transition hover:bg-[#1da851]"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {labels.whatsappCta}
            </a>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={onSubmit}
          className="border-t border-[var(--border)] bg-[var(--surface)] px-3 pt-3 pb-2.5"
        >
          <div className="flex items-end gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                conversationCapped || rateLimited
                  ? labels.placeholderCapped
                  : labels.placeholder
              }
              disabled={inputDisabled}
              maxLength={500}
              className="min-w-0 flex-1 rounded-full border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-[14px] text-[var(--ink-950)] placeholder:text-[var(--ink-700)]/70 transition focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/15 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={inputDisabled || !input.trim()}
              aria-label={labels.send}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-white shadow-[var(--shadow-sm)] transition hover:bg-[var(--accent-hover)] hover:shadow-[var(--shadow-md)] disabled:cursor-not-allowed disabled:opacity-30 disabled:shadow-none"
            >
              <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
            </button>
          </div>
          <p className="mt-2 text-center text-[10px] text-[var(--ink-700)]/70">
            {labels.poweredBy}
          </p>
        </form>
      </div>
    </>
  );
}

function AssistantMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-end gap-2">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--ink-950)] ring-1 ring-black/5">
        <BrandMark
          tone="orange"
          alt=""
          className="h-4 w-4 object-contain"
          sizes="16px"
        />
      </div>
      <div className="max-w-[78%] whitespace-pre-wrap rounded-2xl rounded-bl-sm bg-[var(--surface-raised)] px-3.5 py-2.5 text-[14px] leading-relaxed text-[var(--ink-950)] shadow-[var(--shadow-xs)]">
        {children}
      </div>
    </div>
  );
}

function UserBubble({ content }: { content: string }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[78%] whitespace-pre-wrap rounded-2xl rounded-br-sm bg-[var(--accent)] px-3.5 py-2.5 text-[14px] leading-relaxed text-white shadow-[var(--shadow-xs)]">
        {content}
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-1">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current opacity-60" />
      <span
        className="h-1.5 w-1.5 animate-pulse rounded-full bg-current opacity-60"
        style={{ animationDelay: "120ms" }}
      />
      <span
        className="h-1.5 w-1.5 animate-pulse rounded-full bg-current opacity-60"
        style={{ animationDelay: "240ms" }}
      />
    </span>
  );
}

function RobotMascot({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <defs>
        <linearGradient id="robotBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#ea6c0e" />
        </linearGradient>
        <linearGradient id="robotVisor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>
        <radialGradient id="robotEyeGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#fdba74" />
          <stop offset="100%" stopColor="#f97316" />
        </radialGradient>
      </defs>

      {/* Antenna */}
      <line
        x1="32"
        y1="6"
        x2="32"
        y2="14"
        stroke="#475569"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle
        cx="32"
        cy="5.5"
        r="2.5"
        fill="#10b981"
        style={{
          transformOrigin: "32px 5.5px",
          animation: "chat-robot-antenna 1.8s ease-in-out infinite",
        }}
      />

      {/* Head/body */}
      <rect
        x="8"
        y="14"
        width="48"
        height="44"
        rx="14"
        fill="url(#robotBody)"
      />
      {/* Top highlight */}
      <rect
        x="8"
        y="14"
        width="48"
        height="14"
        rx="14"
        fill="white"
        opacity="0.12"
      />
      {/* Side ear / detail */}
      <rect x="3" y="28" width="5" height="14" rx="2.5" fill="#0f172a" opacity="0.85" />
      <rect x="56" y="28" width="5" height="14" rx="2.5" fill="#0f172a" opacity="0.85" />

      {/* Visor */}
      <rect x="14" y="22" width="36" height="22" rx="10" fill="url(#robotVisor)" />
      {/* Visor inner glow line */}
      <rect
        x="14.5"
        y="22.5"
        width="35"
        height="21"
        rx="9.5"
        fill="none"
        stroke="rgba(249,115,22,0.2)"
        strokeWidth="1"
      />

      {/* Eyes (glowing pixels) */}
      <g
        style={{
          transformOrigin: "32px 33px",
          animation: "chat-robot-blink 5.2s ease-in-out infinite",
        }}
      >
        <circle cx="24" cy="33" r="3.6" fill="url(#robotEyeGlow)" />
        <circle cx="40" cy="33" r="3.6" fill="url(#robotEyeGlow)" />
        {/* Eye highlights */}
        <circle cx="25.2" cy="31.8" r="1" fill="white" opacity="0.95" />
        <circle cx="41.2" cy="31.8" r="1" fill="white" opacity="0.95" />
      </g>

      {/* Smile */}
      <path
        d="M 24 50 Q 32 54 40 50"
        stroke="rgba(15,23,42,0.55)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Cheek dots */}
      <circle cx="16" cy="48" r="1.6" fill="rgba(15,23,42,0.35)" />
      <circle cx="48" cy="48" r="1.6" fill="rgba(15,23,42,0.35)" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.464 3.488" />
    </svg>
  );
}
