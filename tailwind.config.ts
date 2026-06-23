import type { Config } from "tailwindcss";

/**
 * Paleta și fonturile RIVO.
 * Pentru a schimba accentul premium, modifică valorile `accent` de mai jos
 * (sau variabilele CSS din `src/app/globals.css`).
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Bază sobră, cinematică
        ink: {
          DEFAULT: "#0E0E10", // charcoal aproape negru
          soft: "#15151A",
          muted: "#1E1E24",
        },
        bone: {
          DEFAULT: "#F4F1EA", // off-white cald
          soft: "#EAE5DA",
        },
        // Accent premium (bronz / champagne) — schimbă aici pentru alt accent
        accent: {
          DEFAULT: "#B8956A",
          soft: "#C9AC85",
          deep: "#9A774E",
        },
      },
      fontFamily: {
        // Mapate la variabilele next/font din layout.tsx
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      maxWidth: {
        container: "88rem",
      },
      transitionTimingFunction: {
        rivo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "scroll-hint": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.4" },
          "50%": { transform: "translateY(8px)", opacity: "1" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "scroll-hint": "scroll-hint 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
