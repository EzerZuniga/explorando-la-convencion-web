import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "-apple-system", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-heading)", "Georgia", "serif"],
        heading: ["var(--font-heading)", "Georgia", "serif"],
      },
      borderWidth: {
        3: "3px",
      },
      colors: {
        brand: {
          text:            "var(--color-heading)",
          background:      "var(--color-background)",
          primary:         "var(--color-primary)",
          "primary-light": "var(--color-primary-light)",
          "primary-dark":  "var(--color-primary-dark)",
          secondary:       "var(--color-secondary)",
          accent:          "var(--color-accent)",
          dark:            "var(--color-dark)",
          "dark-2":        "var(--color-dark-2)",
          "dark-green":    "var(--color-dark-green)",
          blue:            "var(--color-blue)",
          "blue-muted":    "var(--color-blue-muted)",
          "surface-warm":  "var(--color-surface-warm)",
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
        "glow-green": "glowGreen 2.5s ease-in-out infinite",
        "topbar-in": "topbarIn 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        "hero-zoom": "heroZoom 9s ease-out forwards",
        "slide-down": "slideDown 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
      },
      transitionTimingFunction: {
        "smooth-out": "cubic-bezier(0.22, 1, 0.36, 1)",
        ripple: "cubic-bezier(0.2, 1, 0.2, 1)",
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
        glowGreen: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(37, 211, 102, 0)" },
          "50%": { boxShadow: "0 0 22px 6px rgba(37, 211, 102, 0.28)" },
        },
        topbarIn: {
          from: { opacity: "0", transform: "translateY(-100%)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        heroZoom: {
          "0%": { transform: "scale(1.07)" },
          "100%": { transform: "scale(1)" },
        },
        slideDown: {
          from: { opacity: "0", transform: "translateY(-14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [animate],
} satisfies Config;
