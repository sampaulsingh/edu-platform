import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Client-side Firebase auth does not automatically secure server routes.
// For full protection, upgrade this starter to Firebase Admin session cookies.
// This middleware currently allows access and serves as a placeholder.
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/certificate/:path*'],
};
