import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function updateSession(req: NextRequest) {
  const res = NextResponse.next();

  // Create a server client with cookies configured
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookies) =>
          cookies.forEach(({ name, value, options }) =>
            res.cookies.set({ name, value, ...options })
          ),
      },
    }
  );

  // Forces a refresh if the JWT is expired
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !req.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return res;
}
