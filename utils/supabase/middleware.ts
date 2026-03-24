import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export const createClient = async (request: NextRequest) => {
  // Create an unmodified response
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    supabaseUrl!,
    supabaseKey!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    },
  );

  // IMPORTANT: DO NOT REMOVE. This refreshes the session if it's expired.
  const { data: { user } } = await supabase.auth.getUser();

  // Route protection logic
  const url = request.nextUrl.clone();
  
  if (!user && (url.pathname.startsWith('/dashboard') || url.pathname.startsWith('/roadmaps') || url.pathname.startsWith('/quiz'))) {
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  if (user && url.pathname.startsWith('/auth')) {
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
};
