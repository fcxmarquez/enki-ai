import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import { ModalRender } from "@/components/Modals/ModalRender";
import { ShadcnModalRender } from "@/components/Modals/ShadcnModalRender";
import { AppSidebar } from "@/components/app-sidebar";
import { NavActions } from "@/components/nav-actions";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ModelSelector } from "@/components/model-selector";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-primary",
});

export const metadata: Metadata = {
  title: "EnkiAI",
  description: "AI-powered chat application",
};

/**
 * Defines the root layout for the Next.js application with a modern sidebar layout.
 *
 * Wraps all page content with the Inter font, global providers, sidebar navigation, and header.
 *
 * @param children - The page content to be rendered within the layout.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${inter.className} `}>
        <Providers>
          <ModalRender />
          <ShadcnModalRender />
          <Toaster />
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className="flex h-14 shrink-0 items-center gap-2">
                <div className="flex flex-1 items-center gap-2 px-3">
                  <SidebarTrigger />
                  <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                  />
                  <ModelSelector />
                </div>
                <div className="ml-auto px-3">
                  <NavActions />
                </div>
              </header>
              <div className="flex flex-1 flex-col">{children}</div>
            </SidebarInset>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
