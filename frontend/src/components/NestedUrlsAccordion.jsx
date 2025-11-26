import React, { useState } from "react";
import { motion } from "framer-motion";

export default function NestedUrlsAccordion({ nestedResults }) {
  // Hooks must ALWAYS be at the top
  const [open, setOpen] = useState(false);

  // SAFE GUARD — after hooks
  if (!nestedResults || nestedResults.length === 0) return null;

  return (
    <div className="mt-10">
      {/* Accordion Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="
          w-full flex justify-between items-center 
          bg-gradient-to-r from-indigo-500 to-purple-500
          text-white px-5 py-3 rounded-xl font-semibold shadow
          hover:opacity-90 transition
        "
      >
        <span>Nested URLs ({nestedResults.length})</span>
        <span>{open ? "▲" : "▼"}</span>
      </button>

      {/* Expand Area */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="
            mt-5 space-y-6 
            bg-white/40 dark:bg-white/5 p-5 rounded-xl 
            border border-black/10 dark:border-white/10
          "
        >
          {nestedResults.map((item, idx) => {
            const safeKeywords =
              item?.keywordCounts && typeof item.keywordCounts === "object"
                ? item.keywordCounts
                : {};

            const safeDates =
              Array.isArray(item?.dateMatches) ? item.dateMatches : [];

            return (
              <div
                key={idx}
                className="border-b border-black/10 dark:border-white/10 pb-5"
              >
                {/* URL */}
                <p className="font-semibold text-indigo-500 break-all">
                  {item.url}
                </p>

                {/* Title */}
                <p className="mt-2 text-gray-800 dark:text-gray-200">
                  <span className="font-semibold">Title:</span>{" "}
                  {item.title || "N/A"}
                </p>

                {/* Keywords */}
                <div className="mt-3">
                  <span className="font-semibold">Keywords:</span>
                  {Object.keys(safeKeywords).length > 0 ? (
                    <ul className="ml-5 mt-1 space-y-1 text-gray-700 dark:text-gray-300">
                      {Object.entries(safeKeywords).map(([k, v]) => (
                        <li key={k}>
                          <span className="font-semibold">{k}:</span> {v}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400 ml-2">None</p>
                  )}
                </div>

                {/* Dates */}
                <div className="mt-3">
                  <span className="font-semibold">Detected Dates:</span>
                  {safeDates.length > 0 ? (
                    <ul className="ml-5 mt-1 space-y-1 text-gray-700 dark:text-gray-300">
                      {safeDates.map((date, i) => (
                        <li key={i}>{date}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400 ml-2">None</p>
                  )}
                </div>

                {/* Screenshot */}
                <div className="mt-4">
                  <span className="font-semibold">Screenshot:</span>
                  {item.screenshotUrl ? (
                    <img
                      src={item.screenshotUrl}
                      alt="Nested Screenshot"
                      className="
                        w-56 h-36 object-cover rounded-lg mt-2
                        shadow-md border border-black/10 dark:border-white/10
                      "
                    />
                  ) : (
                    <p className="text-gray-400 ml-2 mt-2">
                      N/A (Static scrape)
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
