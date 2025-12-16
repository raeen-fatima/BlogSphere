import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // token from cookie OR authorization header
  const token =
    req.cookies.get("token")?.value ||
    req.headers.get("authorization")?.split(" ")[1];

  /* ======================
     DASHBOARD (ANY USER)
     ====================== */
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
    } catch (err) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  /* ======================
        ADMIN ONLY
     ====================== */
  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );

      if (payload.role !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    } catch (err) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
