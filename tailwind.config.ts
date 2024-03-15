import type { Config } from "tailwindcss";
/** @type {import('tailwindcss').Config} */
import { breakpoints } from "./constants/systemDesign/breakpoints";
import { colors } from "./constants/systemDesign/colors";

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
      colors: colors,
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
