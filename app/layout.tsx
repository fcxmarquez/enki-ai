import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { NavBar } from "@/components/NavBar";
import { UIProvider } from "@/store/ui";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-primary",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
        <UIProvider>
          <Providers>
            <NavBar />
            {children}
          </Providers>
        </UIProvider>
      </body>
    </html>
  );
}
