import { NextResponse } from 'next/server';

export default function Middleware(request) {
  const routesProtected = ['/histori', '/account'];

  const { pathname } = request.nextUrl;

  let token = request.cookies.get('sessionToken');

  if (routesProtected.some((prefix) => pathname.startsWith(prefix))) {
    if (!token) {
      return NextResponse.redirect(
        new URL(`/auth/login?callbackUrl=${pathname}`, request.url)
      );
    }
  }

  if (pathname.startsWith('/auth')) {
    if (token) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
}
