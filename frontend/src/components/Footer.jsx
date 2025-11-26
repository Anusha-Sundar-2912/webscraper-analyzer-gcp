import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="mt-20 py-6 text-center text-gray-300 dark:text-gray-500 
                 backdrop-blur-lg bg-white/5 dark:bg-black/20 border-t 
                 border-white/20 dark:border-gray-700"
    >
      <p className="text-sm">
        © {new Date().getFullYear()} WebScraper Analyzer • Built with ❤️ using React, Selenium, JSoup & GCP
      </p>
    </motion.footer>
  );
}
