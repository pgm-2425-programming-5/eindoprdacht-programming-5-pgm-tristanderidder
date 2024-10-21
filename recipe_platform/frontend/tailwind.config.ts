import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
      primary: "#D0BE9A",
        secondary: "#211C18",
        tertiary: "#443D32",
        accent: "#FFFDFD",
        primaryOpacity: "rgba(208, 190, 154, 0.5)",
      },
    },
  },
  plugins: [],
};
export default config;
