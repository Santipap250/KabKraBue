import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // KabKraBue design tokens — a rice-paddy / water-buffalo-hide
        // palette rather than a generic template palette.
        ink: "#1C1B17", // charcoal hide — primary foreground / dark surfaces
        rice: "#F5F1E2", // pale rice husk — primary background
        paddy: {
          DEFAULT: "#3F5A3D", // deep rice-paddy green — primary accent
          light: "#5C7A57",
          dark: "#28381F",
        },
        clay: {
          DEFAULT: "#A9542F", // sun-baked clay roof tile — secondary accent
          light: "#C97C4F",
        },
        gold: "#C99A3E", // dusk lantern gold — tertiary accent
        mist: "#DCE3D1", // morning mist — muted surface
        border: {
          DEFAULT: "rgba(28,27,23,0.12)",
          dark: "rgba(245,241,226,0.16)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      maxWidth: {
        content: "1400px",
      },
      backgroundImage: {
        grain: "url('/images/grain.svg')",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scroll-pulse": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.4" },
          "50%": { transform: "translateY(8px)", opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.16,1,0.3,1) both",
        "scroll-pulse": "scroll-pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
