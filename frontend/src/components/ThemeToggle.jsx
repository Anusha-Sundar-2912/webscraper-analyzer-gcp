import React, { useEffect, useState } from "react";
import { BsSun, BsMoon } from "react-icons/bs";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  // Apply theme to <html> safely
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="
        p-3 rounded-2xl 
        bg-white/60 dark:bg-white/10 
        backdrop-blur-xl 
        shadow-lg 
        border border-black/10 dark:border-white/10
        hover:scale-110 active:scale-95
        transition-all duration-300
        flex items-center justify-center
      "
    >
      {theme === "dark" ? (
        <BsSun
          className="
            text-yellow-400 text-2xl 
            transition-transform duration-500 
            transform hover:rotate-90
          "
        />
      ) : (
        <BsMoon
          className="
            text-blue-500 text-2xl
            transition-transform duration-500 
            transform hover:-rotate-90
          "
        />
      )}
    </button>
  );
}
