import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privatePaths = ["/me"];
const authPaths = ["/login", "/register"];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const {pathname} = request?.nextUrl
  const sessionToken = request.cookies.get("sessionToken")?.value;
  // Check if the request is for a private path and the user is not authenticated
  if (privatePaths.includes(pathname) && !sessionToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  // Check if the request is for an auth path and the user is authenticated
  if (authPaths.includes(pathname) && sessionToken) {
    return NextResponse.redirect(new URL('/me', request.url));
  } 

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/register", "/me"],
};
