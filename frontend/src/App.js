import React from "react";
import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";

import Navbar from "./components/Navbar";
import ParticleBackground from "./components/ParticleBackground";
import AuroraBackground from "./components/AuroraBackground";
import ThemeToggle from "./components/ThemeToggle";

import Dashboard from "./pages/Dashboard";
import Documentation from "./pages/Documentation";

function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen overflow-x-hidden bg-transparent"
    >
      {/* 🌌 GALAXY BACKGROUND (ONLY THESE TWO!) */}
      <div className="absolute inset-0 -z-50 pointer-events-none">
        <AuroraBackground />
        <ParticleBackground />
      </div>

      {/* NAVBAR */}
      <Navbar />

      {/* THEME TOGGLE */}
      <div className="fixed top-4 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* PAGE CONTENT */}
      <div className="pt-28 pb-16 px-4 max-w-6xl mx-auto relative z-10">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/documentation" element={<Documentation />} />
        </Routes>
      </div>
    </motion.div>
  );
}

export default App;
