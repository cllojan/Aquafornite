import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ⚙️ Corrige headers inválidos en desarrollo (Cloud Workstations o localhost)
  if (process.env.NODE_ENV !== "production" && process.env.BETTER_AUTH_URL) {
    const headers = new Headers(request.headers);
    const targetHost = new URL(process.env.BETTER_AUTH_URL).host;

    headers.set("x-forwarded-host", targetHost);
    headers.set("origin", `https://${targetHost}`);

    return NextResponse.next({
      request: {
        headers,
      },
    });
  }

  // 🔒 Protege rutas
  const sessionCookie = getSessionCookie(request);
  if (!sessionCookie && pathname === "/perfil") {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/perfil"],
};