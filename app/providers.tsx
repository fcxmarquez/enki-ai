"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import chakraUITheme from "@/theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={chakraUITheme}>{children}</ChakraProvider>
    </CacheProvider>
  );
}
