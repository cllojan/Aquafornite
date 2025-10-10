// middleware.ts
import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  // Optimistic check: redirigir si no hay cookie y se accede a una ruta protegida.
  if (!sessionCookie) {
    // Si estás en la página de perfil, te redirige al inicio de sesión.
    if (pathname === "/perfil") {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Solo se aplica a la ruta /perfil, igual que en tu código.
  matcher: ["/perfil"], 
};