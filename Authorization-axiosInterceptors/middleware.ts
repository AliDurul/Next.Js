import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import type { NextRequest } from "next/server";
import type { JWT } from "next-auth/jwt";

export default withAuth(
  function middleware(req: NextRequest) {
    const token = req.nextauth.token as JWT | undefined;

    const userInfo = token?.userInfo as { role: number } | undefined;

    if (
      req.nextUrl.pathname.startsWith("/dashboard/admin") &&
      userInfo?.role !== 5
    ) {
      console.log("if blog calisti");
      return NextResponse.rewrite(new URL("/denied", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = { matcher: ["/dashboard/:path*"] };