import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        gradientX: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
        wordPop: {
          "0%": { transform: "translateY(12px) scale(.98)", opacity: "0" },
          "60%": { transform: "translateY(-2px) scale(1.01)", opacity: "1" },
          "100%": { transform: "translateY(0) scale(1)", opacity: "1" },
        },
        underlineShine: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(280%)" },
        },
        pulseRing: {
          "0%": { boxShadow: "0 0 0 0 rgba(56,189,248,0.45)" },
          "70%": { boxShadow: "0 0 0 18px rgba(56,189,248,0.00)" },
          "100%": { boxShadow: "0 0 0 0 rgba(56,189,248,0.00)" },
        },
        spinSlow: {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "gradient-x": "gradientX 7s linear infinite",
        "word-pop": "wordPop .66s cubic-bezier(.22,1,.36,1) both",
        "underline-shine": "underlineShine 1.8s ease-in-out infinite",
        "pulse-ring": "pulseRing 1.8s ease-out infinite",
        "spin-slow": "spinSlow 18s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
