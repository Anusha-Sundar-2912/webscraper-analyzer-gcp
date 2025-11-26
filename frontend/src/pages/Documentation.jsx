import React from "react";
import { motion } from "framer-motion";

export default function Documentation() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-6 text-gray-900 dark:text-gray-100">

      {/* MAIN TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="
          text-5xl font-extrabold text-center mb-14 tracking-tight
          text-[#123B77] 
          dark:text-white
        "
      >
        WebScraper Analyzer Documentation
      </motion.h1>

      {/* TABLE OF CONTENTS */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="
          max-w-4xl mx-auto mb-16 p-6 rounded-2xl 
          bg-white/50 dark:bg-white/10 backdrop-blur-xl 
          shadow-lg border border-black/10 dark:border-white/10
        "
      >
        <h2 className="text-2xl font-bold mb-4">📘 Table of Contents</h2>
        <ul className="list-disc ml-6 space-y-2 text-lg">
          <li><a href="#overview" className="hover:text-blue-400">Project Overview</a></li>
          <li><a href="#features" className="hover:text-blue-400">Key Features</a></li>
          <li><a href="#architecture" className="hover:text-blue-400">Architecture</a></li>
          <li><a href="#usage" className="hover:text-blue-400">How to Use</a></li>
          <li><a href="#api" className="hover:text-blue-400">API Response Example</a></li>
          <li><a href="#github" className="hover:text-blue-400">GitHub Source</a></li>
        </ul>
      </motion.div>

      {/* OVERVIEW */}
      <section id="overview" className="max-w-4xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="
            p-8 rounded-2xl shadow-xl bg-white/50 dark:bg-white/10 
            backdrop-blur-xl border border-black/10 dark:border-white/10
          "
        >
          <h2 className="text-3xl font-bold mb-4">📌 Project Overview</h2>
          <p className="text-lg leading-relaxed">
            WebScraper Analyzer is a cloud-powered scraping tool designed to analyze web pages using both 
            <strong> Jsoup (static) </strong> and 
            <strong> Selenium (dynamic) </strong> modes.
            It extracts metadata, keywords, nested URLs, dates, and generates downloadable reports stored securely in Google Cloud Storage.
          </p>

          <ul className="list-disc ml-6 mt-4 space-y-2">
            <li>Static & dynamic scraping</li>
            <li>Keyword frequency analysis</li>
            <li>Metadata inspection</li>
            <li>Nested URL depth scanning</li>
            <li>Selenium screenshots</li>
            <li>GCP Cloud Storage uploads</li>
            <li>PDF / CSV / JSON report generation</li>
          </ul>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section id="features" className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-10">✨ Features</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            "Keyword Analysis",
            "Metadata Extraction",
            "Deep Scraping",
            "Dynamic Selenium Mode",
            "Screenshot Capture",
            "Cloud Upload (GCP)"
          ].map((item) => (
            <motion.div
              key={item}
              whileHover={{ scale: 1.05 }}
              className="
                p-6 rounded-xl text-center font-medium shadow-lg
                bg-white/40 dark:bg-white/10 backdrop-blur-lg
                border border-black/10 dark:border-white/10
              "
            >
              {item}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section id="architecture" className="mb-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">🏗 Architecture</h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="
            p-8 rounded-2xl bg-white/40 dark:bg-white/10 
            backdrop-blur-xl border border-black/10 dark:border-white/10 
            shadow-xl
          "
        >
          <p className="text-lg leading-relaxed text-center">
            The WebScraper Analyzer follows a modern cloud-based architecture integrating:
          </p>

          <ul className="list-disc ml-6 mt-6 text-lg space-y-2">
            <li>React frontend with Tailwind UI</li>
            <li>Spring Boot backend</li>
            <li>JSOUP & Selenium scraping engines</li>
            <li>Retry logic & nested URL crawling</li>
            <li>PDF / CSV / JSON report processors</li>
            <li>Google Cloud Storage output pipeline</li>
            <li>Dockerized deployment on GCP (GKE)</li>
          </ul>

        </motion.div>
      </section>

      {/* HOW TO USE */}
      <section id="usage" className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-8">🧪 How to Use</h2>

        <div className="
          max-w-4xl mx-auto p-8 rounded-2xl shadow-xl 
          bg-white/40 dark:bg-white/10 backdrop-blur-lg 
          border border-black/10 dark:border-white/10
        ">
          <ol className="list-decimal ml-6 space-y-4 text-lg">
            <li>Enter one or multiple URLs</li>
            <li>Enter keywords (comma-separated)</li>
            <li>Select scraping mode (JSOUP / Selenium)</li>
            <li>Enable deep scrape for nested URLs</li>
            <li>Click <strong>Analyze</strong></li>
            <li>Check results and keyword charts</li>
            <li>Download JSON, CSV, PDF reports</li>
            <li>View Selenium screenshots</li>
          </ol>
        </div>
      </section>

      {/* API EXAMPLE */}
      <section id="api" className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-8">📡 API Response Example</h2>

        <div className="
          max-w-4xl mx-auto p-6 rounded-xl 
          bg-black/90 text-green-300 shadow-lg 
          font-mono text-sm overflow-x-auto
        ">
<pre>{`{
  "url": "https://example.com",
  "title": "Example Domain",
  "description": "This is an example page",
  "keywordCounts": { "example": 12, "domain": 4 },
  "dateMatches": ["2025-11-20", "January 12, 2024"],
  "retryAttempts": 1,
  "jsonUrl": "https://storage.googleapis.com/...json",
  "csvUrl": "https://storage.googleapis.com/...csv",
  "pdfUrl": "https://storage.googleapis.com/...pdf",
  "screenshotUrl": "https://storage.googleapis.com/...png"
}`}</pre>
        </div>
      </section>

      {/* GITHUB LINK */}
      <section id="github" className="text-center pb-12">
        <a
          href="https://github.com/YOUR_GITHUB_HERE"
          target="_blank"
          rel="noopener noreferrer"
          className="
            px-8 py-3 rounded-xl text-white text-lg font-semibold
            bg-gradient-to-r from-blue-500 to-purple-500
            shadow-lg hover:opacity-90 transition
          "
        >
          View Source Code on GitHub
        </a>
      </section>

    </div>
  );
}
