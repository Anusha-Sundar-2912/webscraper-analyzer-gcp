import React from "react";
import { Bar } from "react-chartjs-2";
import { motion } from "framer-motion";
import "../chartConfig";   // IMPORTANT for Chart.js scale registration

export default function KeywordChartMulti({ results }) {

  // No results at all
  if (!results || results.length === 0) {
    return (
      <div className="text-center text-gray-400 py-10">
        No data.
      </div>
    );
  }

  // Collect all keywords safely
  const allKeywords = Array.from(
    new Set(
      results.flatMap(r =>
        r?.keywordCounts && typeof r.keywordCounts === "object"
          ? Object.keys(r.keywordCounts)
          : []
      )
    )
  );

  // When none of the URLs contain valid keywordCounts
  if (allKeywords.length === 0) {
    return (
      <div className="text-center text-gray-400 py-10">
        No keywords found.
      </div>
    );
  }

  const palette = [
    "rgba(99,102,241,0.8)",
    "rgba(139,92,246,0.8)",
    "rgba(236,72,153,0.8)",
    "rgba(14,165,233,0.8)",
    "rgba(34,197,94,0.8)",
    "rgba(249,115,22,0.8)",
    "rgba(250,204,21,0.8)",
  ];

  const datasets = results.map((res, index) => {
    const safeCounts = res?.keywordCounts && typeof res.keywordCounts === "object"
      ? res.keywordCounts
      : {};

    return {
      label: res.url,
      data: allKeywords.map(k => safeCounts[k] || 0),
      backgroundColor: palette[index % palette.length],
      borderRadius: 8,
    };
  });

  const chartData = {
    labels: allKeywords,
    datasets,
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[400px]"
    >
      <Bar data={chartData} options={chartOptions} />
    </motion.div>
  );
}
