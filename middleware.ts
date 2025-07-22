import { createClient } from "@/utils/supabase/middleware";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    const { supabase, response } = createClient(request);

    // Refresh session if expired
    const { data: { session }, error } = await supabase.auth.getSession();
    const pathname = request.nextUrl.pathname;

    // Check if user is authenticated for protected routes
    if (pathname.startsWith('/editor') || pathname.startsWith('/settings') || pathname.startsWith('/bookmarks')) {
      if (error || !session?.user) {
        // Not logged in — redirect to login
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        url.searchParams.set('redirectTo', pathname); // Optional: save intended destination
        return NextResponse.redirect(url);
      }

      // Additional role check for editor and settings routes
      if (pathname.startsWith('/editor') || pathname.startsWith('/settings')) {
        const role = session.user.user_metadata?.role || session.user.app_metadata?.role;

        if (role !== 'admin' && role !== 'editor') {
          // Logged in but not authorized — redirect to unauthorized page
          const url = request.nextUrl.clone();
          url.pathname = '/errors/unauthorized';
          return NextResponse.redirect(url);
        }
      }
    }

    return response;
  } catch (e) {
    console.error('Middleware error:', e);
    // Return next response if Supabase client creation fails
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
}

export const config = {
  matcher: [
    '/editor/:path*',
    '/settings/:path*',
    '/bookmarks/:path*',
    '/:path*',
    '/detail/:path*'
  ],
};