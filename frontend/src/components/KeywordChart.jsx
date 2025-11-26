import React from "react";
import { Bar } from "react-chartjs-2";
import { motion } from "framer-motion";
import "../chartConfig"; // VERY IMPORTANT

export default function KeywordChart({ data }) {

  // ---- SAFETY CHECK (fixes your error) ----
  if (
    !data ||
    typeof data !== "object" ||
    Array.isArray(data) ||
    Object.keys(data).length === 0
  ) {
    return (
      <div className="text-center text-gray-500 py-10">
        No keyword matches found.
      </div>
    );
  }

  let labels = [];
  let values = [];

  try {
    labels = Object.keys(data);
    values = Object.values(data);
  } catch {
    return (
      <div className="text-center text-gray-500 py-10">
        Invalid keyword data.
      </div>
    );
  }

  const chartData = {
    labels,
    datasets: [
      {
        label: "Keyword Frequency",
        data: values,
        backgroundColor: "rgba(99,102,241,0.8)",
        borderRadius: 7,
        borderSkipped: false,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "rgba(255,255,255,0.1)" }, beginAtZero: true }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="h-full"
    >
      <Bar data={chartData} options={chartOptions} />
    </motion.div>
  );
}
