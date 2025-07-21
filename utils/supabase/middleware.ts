import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export const createClient = async (request: NextRequest) => {
  // Create an unmodified response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          // If the cookie is updated, update the cookies for the request and response
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          // If the cookie is removed, update the cookies for the request and response
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    },
  );
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const pathname = request.nextUrl.pathname
  // Protect /admin route
  if (pathname.startsWith('/editor') || pathname.startsWith('/settings')) {
    const url = request.nextUrl.clone()
    if (!user) {
      // Not logged in — redirect to login
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }

    // Check if user has 'admin' role
    const role = user.user_metadata?.role || user.app_metadata?.role;

    if (role !== 'admin' || role !== 'editor') {
      // Logged in but not an admin — return 403 Unauthorized
      url.pathname = '/errors/unauthorized'
      return NextResponse.redirect(url)
      // return new NextResponse('Unauthorized access', { status: 403 })
    }
  }
  if (pathname.startsWith('/bookmarks')) {
    const url = request.nextUrl.clone()
    if (!user) {
      // Not logged in — redirect to login
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
  }
  return { supabase, response };
};
