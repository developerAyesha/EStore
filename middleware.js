import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value; // Read token from cookies
  console.log('auth token ............',token);
  const { pathname } = req.nextUrl;

  // Define protected routes
  const protectedRoutes = ["/Tshirts","/Mugs","/Hoodies","/Sticker"];
   console.log('middleware working ...........');
  // Redirect to login if not authenticated
  if (protectedRoutes.includes(pathname) && !token) {
    return NextResponse.redirect(new URL("/Login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Tshirts","/Mugs","/Hoodies","/Sticker"], // Apply middleware to these routes
};
