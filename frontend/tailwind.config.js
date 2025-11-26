/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",

  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        brandBlue: "#3b82f6",
        brandPurple: "#8b5cf6",
      },

      /* ------------------------------------------------------
       * PREMIUM UI ANIMATIONS (Aurora + Blobs + Stars + Streaks)
       * ------------------------------------------------------ */
      keyframes: {
        /* 🌍 Slow Globe Spin */
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },

        /* 🌌 Aurora Layers */
        aurora1: {
          "0%": { transform: "translateX(0) translateY(0) scale(1)" },
          "50%": { transform: "translateX(40px) translateY(-30px) scale(1.1)" },
          "100%": { transform: "translateX(0) translateY(0) scale(1)" },
        },
        aurora2: {
          "0%": { transform: "translateX(0) translateY(0) scale(1)" },
          "50%": { transform: "translateX(-40px) translateY(20px) scale(1.05)" },
          "100%": { transform: "translateX(0) translateY(0) scale(1)" },
        },
        aurora3: {
          "0%": { transform: "translateX(0) translateY(0)" },
          "50%": { transform: "translateX(30px) translateY(40px)" },
          "100%": { transform: "translateX(0) translateY(0)" },
        },
        aurora4: {
          "0%": { transform: "translateX(0) translateY(0)" },
          "50%": { transform: "translateX(-30px) translateY(-20px)" },
          "100%": { transform: "translateX(0) translateY(0)" },
        },

        /* 🟣 Floating Blobs */
        blob1: {
          "0%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(60px,-40px) scale(1.25)" },
          "100%": { transform: "translate(0,0) scale(1)" },
        },
        blob2: {
          "0%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(-70px,50px) scale(1.18)" },
          "100%": { transform: "translate(0,0) scale(1)" },
        },
        blob3: {
          "0%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(40px,70px) scale(1.1)" },
          "100%": { transform: "translate(0,0) scale(1)" },
        },

        /* ✨ Light Streaks */
        streak: {
          "0%": { transform: "translateY(0)", opacity: 0.15 },
          "50%": { opacity: 0.45 },
          "100%": { transform: "translateY(-200px)", opacity: 0 },
        },

        /* ⭐ Star Twinkles */
        twinkle: {
          "0%, 100%": { opacity: 0.4 },
          "50%": { opacity: 1 },
        },

        /* 🌠 Shooting Stars */
        shootingstar: {
          "0%": {
            transform: "translateX(0) translateY(0)",
            opacity: 1,
          },
          "100%": {
            transform: "translateX(-250px) translateY(250px)",
            opacity: 0,
          },
        },
      },

      /* ------------------------------------------------------
       * ANIMATION REGISTRY
       * ------------------------------------------------------ */
      animation: {
        "spin-slow": "spin-slow 10s linear infinite",

        aurora1: "aurora1 9s ease-in-out infinite",
        aurora2: "aurora2 13s ease-in-out infinite",
        aurora3: "aurora3 11s ease-in-out infinite",
        aurora4: "aurora4 15s ease-in-out infinite",

        blob1: "blob1 18s ease-in-out infinite",
        blob2: "blob2 22s ease-in-out infinite",
        blob3: "blob3 26s ease-in-out infinite",

        streak: "streak 6s linear infinite",

        twinkle: "twinkle 2.4s ease-in-out infinite",

        shootingstar: "shootingstar 1s linear infinite",
      },

      backdropBlur: {
        xs: "2px",
      },
    },
  },

  plugins: [],
};
