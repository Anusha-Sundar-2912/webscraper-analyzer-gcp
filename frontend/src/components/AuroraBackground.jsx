import React from "react";

export default function AuroraBackground() {
  return (
    <div
      className="
        absolute inset-0 w-full h-full overflow-hidden pointer-events-none -z-30
        opacity-90 dark:opacity-100
        mix-blend-overlay dark:mix-blend-normal
      "
    >

      {/* Light Mode Soft Vignette */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-b from-black/5 to-transparent
          dark:hidden pointer-events-none
        "
      ></div>

      {/* ⭐ DARK MODE — Enhanced Twinkling Stars ONLY */}
      {[...Array(90)].map((_, i) => (
        <div
          key={i}
          className="
            absolute rounded-full 
            bg-white/70 dark:bg-white/95 
            animate-twinkle
            hidden dark:block
            dark:shadow-[0_0_6px_2px_rgba(255,255,255,0.9)]
          "
          style={{
            width: Math.random() * 2 + 1 + "px",
            height: Math.random() * 2 + 1 + "px",
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            opacity: Math.random() * 0.6 + 0.4,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        ></div>
      ))}

      {/* FLOATING AURORA BLOBS */}
      <div className="absolute w-[90vh] h-[90vh] rounded-full bg-purple-500/35 blur-[110px] animate-blob1 top-[-20%] left-[-10%]"></div>
      <div className="absolute w-[70vh] h-[70vh] rounded-full bg-blue-500/35 blur-[120px] animate-blob2 bottom-[-20%] right-[-15%]"></div>
      <div className="absolute w-[80vh] h-[80vh] rounded-full bg-pink-500/35 blur-[140px] animate-blob3 top-[20%] right-[10%]"></div>

      {/* LARGE GRADIENT AURORA SWEEPS */}
      <div
        className="absolute w-[160%] h-[160%] 
          bg-gradient-to-r from-indigo-500/35 via-purple-500/35 to-blue-500/35 
          blur-3xl rounded-full animate-aurora1 top-[-20%] left-[-20%]"
      ></div>

      <div
        className="absolute w-[150%] h-[150%] 
          bg-gradient-to-r from-blue-400/35 via-sky-400/35 to-cyan-500/35 
          blur-3xl rounded-full animate-aurora2 bottom-[-20%] right-[-10%]"
      ></div>

      <div
        className="absolute w-[180%] h-[180%] 
          bg-gradient-to-r from-purple-400/35 via-pink-400/35 to-red-400/35 
          blur-3xl rounded-full animate-aurora3 top-[-30%] right-[-10%]"
      ></div>

      <div
        className="absolute w-[150%] h-[150%] 
          bg-gradient-to-r from-teal-400/35 via-emerald-400/35 to-green-400/35 
          blur-3xl rounded-full animate-aurora4 bottom-[-10%] left-[-10%]"
      ></div>

    </div>
  );
}
