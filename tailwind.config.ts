import type { Config } from "tailwindcss";
/** @type {import('tailwindcss').Config} */
import { breakpoints } from "./constants/breakpoints";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        background: {
          light: "#FFFFFF",
          dark: "#1A1A1A",
        },
        text: {
          light: "#8A8A8A",
          dark: "#000000",
        },
        primary: { dark: "#000000", light: "#1A1A1A" },
        secondary: {
          default: "#007BFF",
        },
      },
      fontFamily: {
        primary: ["var(--font-primary)"],
        secondary: ["Mono", "monospace"],
      },
    },
    screens: breakpoints,
  },
  plugins: [],
};
export default config;
