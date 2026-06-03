/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        korda: {
          black: "#0A0A0A",
          charcoal: "#111111",
          steel: "#1C1C1E",
          red: "#E8002D",
          glow: "#FF1744",
          white: "#F5F5F0",
          muted: "#888888",
          chrome: "#C0C0C0",
          gold: "#B8961E"
        }
      },
      fontFamily: {
        display: ["'Bebas Neue'", "cursive"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'Space Mono'", "monospace"]
      },
      backgroundImage: {
        'diagonal-stripes': 'repeating-linear-gradient(45deg, #111111, #111111 10px, #1C1C1E 10px, #1C1C1E 20px)'
      },
      boxShadow: {
        'red-neon': '0 0 15px rgba(232, 0, 45, 0.4)',
        'red-neon-strong': '0 0 25px rgba(255, 23, 68, 0.6)'
      }
    }
  },
  plugins: [],
}
