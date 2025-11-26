import React from "react";
import { motion } from "framer-motion";
import NestedUrlsAccordion from "./NestedUrlsAccordion";
import "../chartConfig"; // Important for any charts used below

export default function MultiResultsPanel({ results }) {
  if (!results || results.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card p-10 mt-12 max-w-6xl mx-auto"
    >
      {/* Header */}
      <h3
        className="
          text-3xl font-extrabold text-center
          bg-gradient-to-r from-blue-500 to-purple-500
          bg-clip-text text-transparent mb-10 tracking-tight
        "
      >
        Multi-URL Analysis Results
      </h3>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-white/60 dark:bg-white/5 border-b border-black/10 dark:border-white/10">
              <th className="p-4 text-left font-semibold">URL</th>
              <th className="p-4 text-left font-semibold">Title</th>
              <th className="p-4 text-left font-semibold">Keywords</th>
              <th className="p-4 text-left font-semibold">Detected Dates</th>
              <th className="p-4 text-center font-semibold">Screenshot</th>
              <th className="p-4 text-center font-semibold">Downloads</th>
            </tr>
          </thead>

          <tbody>
            {results.map((res, index) => {
              const safeKeywords =
                res?.keywordCounts && typeof res.keywordCounts === "object"
                  ? res.keywordCounts
                  : {};

              const safeDates =
                Array.isArray(res?.dateMatches) ? res.dateMatches : [];

              return (
                <React.Fragment key={index}>
                  {/* -------------------------------------- */}
                  {/* PARENT ROW */}
                  {/* -------------------------------------- */}
                  <tr
                    className="
                      hover:bg-white/50 dark:hover:bg-white/5 
                      transition-all border-b border-black/10 dark:border-white/10
                    "
                  >
                    {/* URL */}
                    <td className="p-4 break-all">
                      <a
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 dark:text-indigo-400 underline font-medium"
                      >
                        {res.url}
                      </a>
                    </td>

                    {/* Title */}
                    <td className="p-4 text-gray-800 dark:text-gray-200">
                      {res.title || "N/A"}
                    </td>

                    {/* Keywords */}
                    <td className="p-4 text-gray-700 dark:text-gray-300">
                      {Object.keys(safeKeywords).length > 0 ? (
                        <ul className="space-y-1">
                          {Object.entries(safeKeywords).map(([key, value]) => (
                            <li key={key}>
                              <span className="font-semibold">{key}:</span>{" "}
                              {value}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-gray-400">None</span>
                      )}
                    </td>

                    {/* Dates */}
                    <td className="p-4 text-gray-700 dark:text-gray-300">
                      {safeDates.length > 0 ? (
                        <ul className="list-disc ml-5 space-y-1">
                          {safeDates.slice(0, 5).map((d, i) => (
                            <li key={i}>{d}</li>
                          ))}

                          {safeDates.length > 5 && (
                            <p className="text-blue-400 text-sm mt-1 font-semibold">
                              +{safeDates.length - 5} more…
                            </p>
                          )}
                        </ul>
                      ) : (
                        <span className="text-gray-400">None</span>
                      )}
                    </td>

                    {/* Screenshot */}
                    <td className="p-4 text-center">
                      {res.screenshotUrl ? (
                        <img
                          src={res.screenshotUrl}
                          alt="Screenshot"
                          className="
                            w-28 h-20 object-cover rounded-lg 
                            shadow-md border border-black/10 dark:border-white/10
                          "
                        />
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>

                    {/* DOWNLOAD BUTTONS */}
                    <td className="p-4 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <a
                          href={res.jsonUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            px-3 py-1.5 w-24 rounded-lg text-white font-semibold
                            bg-gradient-to-r from-blue-400 to-cyan-300
                            hover:opacity-90 transition
                          "
                        >
                          JSON
                        </a>

                        <a
                          href={res.csvUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            px-3 py-1.5 w-24 rounded-lg text-white font-semibold
                            bg-gradient-to-r from-purple-500 to-pink-500
                            hover:opacity-90 transition
                          "
                        >
                          CSV
                        </a>

                        <a
                          href={res.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            px-3 py-1.5 w-24 rounded-lg text-white font-semibold
                            bg-gradient-to-r from-cyan-500 to-blue-500
                            hover:opacity-90 transition
                          "
                        >
                          PDF
                        </a>
                      </div>
                    </td>
                  </tr>

                  {/* -------------------------------------- */}
                  {/* NESTED URL ACCORDION ROW */}
                  {/* -------------------------------------- */}
                  {res.nestedResults && res.nestedResults.length > 0 && (
                    <tr>
                      <td colSpan="6" className="pt-4">
                        <NestedUrlsAccordion nestedResults={res.nestedResults} />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
