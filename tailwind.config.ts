import type { Config } from "tailwindcss";
/** @type {import('tailwindcss').Config} */
import { breakpoints } from "./constants/systemDesign/breakpoints";
import { colors } from "./constants/systemDesign/colors";

const config: Config = {
  darkMode: ["class"],
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
      colors: colors,
      fontFamily: {
        primary: ["var(--font-primary)"],
        secondary: ["Mono", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
    screens: breakpoints,
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
