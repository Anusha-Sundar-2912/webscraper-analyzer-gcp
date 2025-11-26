import React, { useState } from "react";
import InputPanel from "../components/InputPanel";
import ResultPanel from "../components/ResultPanel";
import MultiResultsPanel from "../components/MultiResultsPanel";
import KeywordChartMulti from "../components/KeywordChartMulti";
import { analyzeSingle, analyzeMulti } from "../api/scraperApi";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [singleResult, setSingle] = useState(null);
  const [multiResult, setMulti] = useState(null);
  const [loading, setLoading] = useState(false);

  const onAnalyze = async (data) => {
    setLoading(true);
    setSingle(null);
    setMulti(null);

    try {
      if (data.urls.length > 1) {
        const res = await analyzeMulti(data);
        setMulti(res);
      } else {
        const res = await analyzeSingle(data);
        setSingle(res);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen pb-24">

      {/* INPUT SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto mt-8"
      >
        <div className="card p-6">
          <InputPanel onAnalyze={onAnalyze} />
        </div>
      </motion.div>

      {/* LOADING SKELETON */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-4xl mx-auto mt-12 space-y-6"
        >
          <div className="card h-6"></div>
          <div className="card h-6 w-3/4"></div>
          <div className="card h-48"></div>
          <div className="card h-6 w-1/2"></div>
          <div className="card h-32"></div>
        </motion.div>
      )}

      {/* SINGLE URL RESULT */}
      {!loading && singleResult && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-5xl mx-auto mt-12"
        >
          <div className="card p-6">
            <ResultPanel result={singleResult} />
          </div>
        </motion.div>
      )}

      {/* MULTI URL RESULT */}
      {!loading && multiResult && (
        <>
          {/* Table Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="max-w-5xl mx-auto mt-12"
          >
            <div className="card p-6" style={{ backdropFilter: "none", WebkitBackdropFilter: "none" }}>
  <KeywordChartMulti results={multiResult} />
</div>

          </motion.div>

          {/* Chart Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="max-w-5xl mx-auto mt-10"
          >
            <div className="card p-6">
              <KeywordChartMulti results={multiResult} />
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
