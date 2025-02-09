import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  
  const isPublic = path === "/login" || path === "/signup" || path === "/" || path === "/verifyemail";

  const token = req.cookies.get("token")?.value || "";

  
  if ((path === "/login" || path === "/signup") && token) {
    return NextResponse.redirect(new URL("/home", req.nextUrl)); 
  }

  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/home", "/profile","/verifyemail"], 
};
