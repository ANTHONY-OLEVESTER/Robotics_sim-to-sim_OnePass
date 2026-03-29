/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#08111a",
        slate: "#0d1722",
        cyan: "#53d6ff",
        mint: "#72f0c0",
        ember: "#ff8a57",
        paper: "#ebf3fb",
        steel: "#8aa1b6"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(83, 214, 255, 0.18), 0 24px 80px rgba(8, 17, 26, 0.55)"
      }
    }
  },
  plugins: []
};
