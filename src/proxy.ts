import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token =
    req.cookies.get("token")?.value ||
    req.headers.get("authorization")?.split(" ")[1];

  const redirectLogin = () =>
    NextResponse.redirect(new URL("/login", req.url));

  try {
    /* ======================
        DASHBOARD & BLOG
       ====================== */
    if (
      pathname.startsWith("/dashboard") 
      // || pathname.startsWith("/blog/[id]/like")
    ) {
      if (!token) return redirectLogin();

      await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
    }

    /* ======================
           ADMIN ONLY
       ====================== */
    if (pathname.startsWith("/admin")) {
      if (!token) return redirectLogin();

      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );

      if (payload.role !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    return NextResponse.next();
  } catch {
    return redirectLogin();
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    // "/blog/[id]/:path*",
  ],
};
