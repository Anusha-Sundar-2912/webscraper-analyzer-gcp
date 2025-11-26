import React, { useState } from "react";
import { motion } from "framer-motion";

export default function InputPanel({ onAnalyze }) {
  const [urls, setUrls] = useState("");
  const [keywords, setKeywords] = useState("");
  const [mode, setMode] = useState("jsoup");
  const [deep, setDeep] = useState(false);

  const handleSubmit = () => {
    const handleSubmit = () => {


  const urlList = urls
    .split(/[\n,]+/)          // split by newline OR comma
    .map(u => u.trim())       // clean spacing
    .filter(Boolean);         // remove empties

  const keywordList = keywords
    .split(",")
    .map(k => k.trim())
    .filter(Boolean);

  if (urlList.length === 0) return alert("Please enter at least one URL.");
  if (keywordList.length === 0) return alert("Please enter keywords.");

  onAnalyze({
    urls: urlList,
    keywords: keywordList,
    mode,
    deep
  });
};

    const keywordList = keywords.split(",").map(k => k.trim()).filter(Boolean);

    if (urlList.length === 0) return alert("Please enter at least one URL.");
    if (keywordList.length === 0) return alert("Please enter keywords.");

    onAnalyze({
      urls: urlList,
      keywords: keywordList,
      mode,
      deep
    });
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="
        w-full p-8 rounded-2xl card
        transition-all duration-300
      "
    >
      {/* Title */}
      <h2
        className="
          text-3xl font-extrabold text-center mb-8 tracking-tight
          text-[#123B77]
          dark:text-white
          dark:drop-shadow-[0_0_6px_rgba(255,255,255,0.45)]
        "
      >
        Enter Website Details
      </h2>

      <div className="space-y-6">

        {/* URL Input */}
        <div>
          <label className="block font-semibold text-gray-900 dark:text-gray-200">
            Enter URL(s)
          </label>
          <input
            className="
              w-full px-4 py-3 mt-2 rounded-xl
              bg-white/60 dark:bg-white/10 backdrop-blur-md
              border border-black/10 dark:border-white/20
              text-gray-900 dark:text-gray-100
              focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
              transition-all outline-none
            "
            placeholder="https://example.com, https://bbc.com"
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
        </div>

        {/* Keywords Input */}
        <div>
          <label className="block font-semibold text-gray-900 dark:text-gray-200">
            Keywords
          </label>
          <input
            className="
              w-full px-4 py-3 mt-2 rounded-xl
              bg-white/60 dark:bg-white/10 backdrop-blur-md
              border border-black/10 dark:border-white/20
              text-gray-900 dark:text-gray-100
              focus:ring-2 focus:ring-indigo-500
              transition-all outline-none
            "
            placeholder="news, sale, iphone"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
        </div>

        {/* Scraping Mode */}
        <div>
          <label className="block font-semibold text-gray-900 dark:text-gray-200">
            Scraping Mode
          </label>
          <select
            className="
              w-full px-4 py-3 mt-2 rounded-xl
              bg-white/60 dark:bg-white/10 backdrop-blur-md
              border border-black/10 dark:border-white/20
              text-gray-900 dark:text-gray-100
              focus:ring-2 focus:ring-indigo-500
              transition-all
            "
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="jsoup">JSOUP (Static)</option>
            <option value="selenium">Selenium (Dynamic)</option>
          </select>
        </div>

        {/* Deep Scrape Toggle */}
        <label className="
          flex items-center gap-3 
          text-gray-900 dark:text-gray-200 font-medium
          mt-2
        ">
          <input
            type="checkbox"
            checked={deep}
            onChange={() => setDeep(!deep)}
            className="
              h-5 w-5 rounded
              bg-white/60 dark:bg-white/10 backdrop-blur-md
              border border-black/20 dark:border-white/20
              focus:ring-2 focus:ring-indigo-500
            "
          />
          Deep Scrape (Nested URLs)
        </label>

      </div>

      {/* Analyze Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleSubmit}
        className="
          w-full mt-10 py-3 text-lg font-semibold text-white 
          rounded-xl shadow-lg shadow-indigo-500/20
          bg-gradient-to-r from-indigo-500 to-blue-500
          hover:opacity-90 transition
        "
      >
        Analyze
      </motion.button>
    </motion.div>
  );
}
