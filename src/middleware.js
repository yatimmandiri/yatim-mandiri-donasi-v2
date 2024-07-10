import { NextResponse } from 'next/server';

const routeProtected = ['/histori', '/account'];

export default function Middleware(request) {
  let token = request.cookies.get('sessionToken');
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/auth')) {
    if (token) {
      return NextResponse.redirect(new URL(`/account`, request.url));
    }
  } else if (routeProtected.some((prefix) => pathname.startsWith(prefix))) {
    if (!token) {
      return NextResponse.redirect(
        new URL(`/auth/login?callbackUrl=${pathname}`, request.url)
      );
    }
  } else {
    return NextResponse.next();
  }
}
