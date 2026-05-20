import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        body: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"],
        heading: ["Playfair Display", "Georgia", "serif"],
        poppins: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        merriweather: ["Playfair Display", "Georgia", "serif"],
      },
      borderWidth: {
        3: "3px",
      },
      colors: {
        brand: {
          text: "#1B4332",
          background: "#F5F9F6",
          primary: "#4BB543",
          secondary: "#F4A261",
        },
        danger: {
          500: "#B05A52",
          600: "#964A43",
          700: "#7B3B35",
          800: "#612E2A",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in",
        "fade-in-up": "fadeInUp 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
        "reveal-up": "revealUp 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
        "modal-in": "modalFadeIn 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        revealUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        modalFadeIn: {
          from: { opacity: "0", transform: "scale(0.9)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
