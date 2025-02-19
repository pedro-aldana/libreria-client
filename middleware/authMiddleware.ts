// authMiddleware.ts

import { NextRequest, NextResponse } from "next/server";

export function protectRoute(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  console.log(token);

  // Si no hay token, redirigir a la página de login
  if (!token) {
    return NextResponse.redirect(new URL("/authentication", request.url));
  }

  // Si hay token, permite el acceso a la ruta
  return NextResponse.next();
}
