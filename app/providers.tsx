"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { hasActiveSession, getUser } from "@/utils/supabase/session";
import { useUserActions } from "@/store";

/**
 * Wraps child components with global providers for error handling and React Query state management.
 *
 * Initializes user authentication state on mount and provides error boundaries and React Query context to all descendants.
 *
 * @param children - The React nodes to be rendered within the provider context.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  const { setIsSignedIn, setUserEmail } = useUserActions();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  useEffect(() => {
    const checkSession = async () => {
      const isSignedIn = await hasActiveSession();
      if (isSignedIn) {
        setIsSignedIn(true);
        const user = await getUser();
        setUserEmail(user?.email || "");
      }
    };
    checkSession();
  }, []);

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
