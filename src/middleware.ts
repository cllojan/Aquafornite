// middleware.ts
import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  // ✅ Forzar el host correcto en desarrollo (Cloud Workstations, localhost, etc.)
  if (process.env.NODE_ENV === "development" && process.env.BETTER_AUTH_URL) {
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

  // ✅ Mantener tu redirección si no hay sesión y accede a /perfil
  if (!sessionCookie && pathname === "/perfil") {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

// ✅ Se aplica solo a /perfil (puedes agregar más rutas si quieres proteger otras)
export const config = {
  matcher: ["/perfil"],
};