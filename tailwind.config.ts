import type { Config } from "tailwindcss";
/** @type {import('tailwindcss').Config} */

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#000000",
        secondary: {
          white: "#FFFFFF",
          gray: "#8A8A8A",
          blue: "#007BFF",
        },
        accent: {
          red: "#FF0000",
          green: "#28A745",
        },
      },
      fontFamily: {
        primary: ["var(--font-primary)"],
        secondary: ["Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
