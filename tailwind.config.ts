import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // 👈 NECESARIO para que funcione el modo oscuro
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: { extend: {} },
  plugins: [],
};
export default config;
