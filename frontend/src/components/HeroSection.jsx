import React from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="pt-32 pb-10 text-center max-w-3xl mx-auto"
    >
      <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
        Analyze Any Website Instantly
      </h1>

      <p className="text-gray-600 dark:text-gray-300 mt-4 text-lg">
        Get metadata, screenshots, keyword frequency, nested URL scans, reports, and more —
        powered by JSoup, Selenium & Google Cloud Storage.
      </p>
    </motion.div>
  );
}
