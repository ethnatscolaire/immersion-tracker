import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { kratosFrontendApi } from "./lib/kratos";
import { isAxiosError } from "axios";

export async function proxy(request: NextRequest) {
  try {
    await kratosFrontendApi.toSession(undefined, {
      headers: {
        Cookie: request.headers.get("cookie"),
      },
    });
  } catch (err) {
    if (isAxiosError(err) && err.status === 401) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }
  }
}

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    "/((?!api|_next/static|_next/image|auth/|.*\\.png$).*)",
  ],
};
