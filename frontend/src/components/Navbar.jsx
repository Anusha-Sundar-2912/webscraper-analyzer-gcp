import React from "react";
import { Link } from "react-router-dom";
import { FaGlobeAmericas } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav
      className="
        fixed top-0 left-0 w-full z-50
        backdrop-blur-2xl
        bg-white/20 dark:bg-black/10
        border-b border-white/10 dark:border-white/5
        shadow-md
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO + TITLE */}
        <Link to="/" className="flex items-center gap-3 select-none">

          {/* Globe matches heading color */}
          <FaGlobeAmericas
            className="
              text-[#123B77] dark:text-white
              text-3xl animate-spin-slow
            "
          />

          {/* Title text – uniform across app */}
          <span
            className="
              text-2xl font-extrabold tracking-tight
              text-[#123B77] dark:text-white
            "
          >
            WebScraper Analyzer
          </span>

        </Link>

        {/* RIGHT SIDE MENU */}
        <div className="flex items-center gap-4">

          <Link
            to="/documentation"
            className="
              px-4 py-2 rounded-xl text-sm font-semibold
              bg-white/30 dark:bg-white/10
              hover:bg-white/50 dark:hover:bg-white/20
              text-gray-900 dark:text-gray-200
              transition-all duration-300 shadow-sm
            "
          >
            Documentation
          </Link>

        </div>

      </div>
    </nav>
  );
}
