// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // adjust if needed
  ],
  theme: {
    extend: {
      fontFamily: {
        echoes: ["EchoesFont", "sans-serif"], // ✅ custom font
      },
      keyframes: {
        bubble: {
          "0%": { transform: "translateY(100vh) scale(0.5)", opacity: "0" },
          "50%": { opacity: "0.8" },
          "100%": { transform: "translateY(-10vh) scale(1.2)", opacity: "0" },
        },
      },
      animation: {
        bubble: "bubble 12s linear infinite", // ✅ default duration
        "bubble-slow": "bubble 20s linear infinite",
        "bubble-fast": "bubble 8s linear infinite",
      },
    },
  },
  plugins: [],
};
