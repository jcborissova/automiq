import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname !== "/") {
    return NextResponse.next();
  }

  const primaryLanguage =
    request.headers
      .get("accept-language")
      ?.toLowerCase()
      .split(",")[0]
      ?.trim() ?? "";

  const destination = primaryLanguage.startsWith("es") ? "/es" : "/en";
  return NextResponse.redirect(new URL(destination, request.url));
}

export const config = {
  matcher: "/",
};
