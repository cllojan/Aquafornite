import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // 🔧 Solo para entornos de desarrollo
  if (process.env.NODE_ENV === "development") {
    const origin = request.headers.get("origin");
    if (origin) {
      const forwardedHost = origin.replace(/^https?:\/\//, "");
      const response = NextResponse.next();
      response.headers.set("x-forwarded-host", forwardedHost);
      return response;
    }
  }

  const sessionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  if (!sessionCookie && pathname === "/perfil") {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/perfil"],
};