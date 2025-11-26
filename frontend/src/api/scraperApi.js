import axios from "axios";

const API_BASE = "http://34.100.164.25:8080";

export const analyzeSingle = async (data) => {
  return (await axios.post(`${API_BASE}/analyze`, data)).data;
};

export const analyzeMulti = async (data) => {
  return (await axios.post(`${API_BASE}/analyze/multi`, data)).data;
};
