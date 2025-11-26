import React from "react";
import { motion } from "framer-motion";
import KeywordChart from "./KeywordChart";
import NestedUrlsAccordion from "./NestedUrlsAccordion";
import "../chartConfig"; // IMPORTANT

export default function ResultPanel({ result }) {
  if (!result) return null;

  console.log("🟦 RESULT PANEL → Full result object:", result);
  console.log("🟨 RESULT PANEL → KeywordCounts:", result.keywordCounts);

  const safeKeywords =
    result?.keywordCounts && typeof result.keywordCounts === "object"
      ? result.keywordCounts
      : {};

  const safeDates =
    Array.isArray(result?.dateMatches) ? result.dateMatches : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card p-10 mt-10 w-full max-w-4xl mx-auto"
    >
      {/* URL Header */}
      <h3
        className="
          text-2xl font-extrabold tracking-tight 
          bg-gradient-to-r from-blue-400 to-cyan-300
          bg-clip-text text-transparent
        "
      >
        Results for {result.url}
      </h3>

      <div className="mt-8 space-y-8 text-gray-800 dark:text-gray-200">

        {/* Title */}
        <div>
          <h4 className="font-semibold">Title</h4>
          <p className="mt-1 text-gray-700 dark:text-gray-300">
            {result.title || "N/A"}
          </p>
        </div>

        {/* Description */}
        <div>
          <h4 className="font-semibold">Description</h4>
          <p className="mt-1 text-gray-700 dark:text-gray-300 leading-relaxed">
            {result.description || "N/A"}
          </p>
        </div>

        {/* Retry Attempts */}
        <div>
          <h4 className="font-semibold">Retry Attempts</h4>
          <p className="mt-1">{result.retryAttempts}</p>
        </div>

        {/* Dates */}
        <div>
          <h4 className="font-semibold">Detected Dates</h4>

          {safeDates.length > 0 ? (
            <div
              className="
                bg-white/40 dark:bg-white/5 rounded-xl p-4 mt-2
                border border-black/10 dark:border-white/10
                max-h-40 overflow-y-auto
              "
            >
              <ul className="list-disc ml-6 space-y-1">
                {safeDates.map((d, idx) => (
                  <li key={idx}>{d}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-400 mt-1">No dates detected.</p>
          )}
        </div>

        {/* Keyword List + Chart */}
        <div className="mt-10">
          <h4 className="font-semibold mb-3">Keyword Frequency</h4>

          {Object.keys(safeKeywords).length > 0 ? (
            <ul className="mb-4 space-y-1 text-gray-700 dark:text-gray-300">
              {Object.entries(safeKeywords).map(([key, value]) => (
                <li key={key}>
                  <span className="font-semibold">{key}:</span> {value}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 mb-4">No keyword matches found.</p>
          )}

          <div
            className="
              bg-white/40 dark:bg-white/5 p-5 rounded-xl
              border border-black/10 dark:border-white/10 shadow-sm
            "
          >
            <div className="h-72">
              <KeywordChart data={safeKeywords} />
            </div>
          </div>
        </div>

        {/* Nested URLs Accordion (correct position – above screenshot) */}
        {result.nestedResults && result.nestedResults.length > 0 && (
          <NestedUrlsAccordion nestedResults={result.nestedResults} />
        )}

        {/* Screenshot */}
        {result.screenshotUrl && (
          <div className="mt-10">
            <h4 className="font-semibold mb-3">Screenshot</h4>

            <img
              src={result.screenshotUrl}
              alt="Screenshot"
              className="
                w-full rounded-xl shadow-lg 
                border border-black/10 dark:border-white/10
              "
            />
          </div>
        )}

        {/* Downloads */}
        <div className="mt-12">
          <h4 className="font-semibold mb-3">Download Reports</h4>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={result.jsonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex-1 px-5 py-3 rounded-xl text-center font-semibold
                bg-gradient-to-r from-indigo-500 to-blue-500 text-white
                shadow hover:opacity-90 transition
              "
            >
              JSON
            </a>

            <a
              href={result.csvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex-1 px-5 py-3 rounded-xl text-center font-semibold
                bg-gradient-to-r from-purple-500 to-pink-500 text-white
                shadow hover:opacity-90 transition
              "
            >
              CSV
            </a>

            <a
              href={result.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex-1 px-5 py-3 rounded-xl text-center font-semibold
                bg-gradient-to-r from-cyan-500 to-blue-500 text-white
                shadow hover:opacity-90 transition
              "
            >
              PDF
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
