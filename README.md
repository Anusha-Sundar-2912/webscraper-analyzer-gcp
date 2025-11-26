🌐 WebScraper Analyzer

A full-stack cloud-deployed smart web-scraping system built with React, Spring Boot, JSoup, Selenium, Docker, and Google Kubernetes Engine (GKE) — capable of scraping static & dynamic websites, analyzing metadata, extracting keywords, and exporting results as PDF, CSV, JSON.

🚀 Live Demo 
Frontend (Public UI)

👉 http://35.200.219.140/

Backend (Public API – GKE LoadBalancer)

Single URL Analysis

http://34.100.164.25:8080/api/analyze

Multi-URL Analysis

http://34.100.164.25:8080/api/analyze/multi

🏗️ System Architecture

⚡ Features
🔍 Scraping Modes

JSoup (Static Scraping)

Selenium (Dynamic Scraping + screenshots)

Deep Scraping (Nested URLs)

📦 Output Generators

PDF Report

CSV Summary

JSON Result

Uploaded automatically to Google Cloud Storage

☁️ Cloud Deployment

Dockerized Backend & Frontend

Hosted on Google Kubernetes Engine (GKE)

Google Artifact Registry for images

Cloud Storage for exports

Load Balancer for public access

📥 API Usage (Postman Example)
🔹 Single URL
POST http://34.100.164.25:8080/api/analyze


Body:

{
  "url": "https://example.com",
  "keywords": ["example", "domain"],
  "mode": "jsoup",
  "deep": false
}

🔹 Multi-URL
POST http://34.100.164.25:8080/api/analyze/multi


Body:

{
  "urls": [
    "https://example.com",
    "https://wikipedia.org"
  ],
  "keywords": ["web", "info"],
  "mode": "selenium",
  "deep": false
}

🗂️ Technology Stack
Frontend

React

Tailwind CSS

Axios

Chart.js

Backend

Java + Spring Boot

JSoup (Static Scraping)

Selenium (Dynamic Scraping)

Lombok

PDFBox

OpenCSV

Cloud

Google Cloud Platform (GCP)

Google Kubernetes Engine (GKE)

Google Artifact Registry

Google Cloud Storage

🐳 Deployment Overview

Build Docker images for frontend & backend

Push images to Artifact Registry

Deploy using Kubernetes manifests

Expose frontend + backend via LoadBalancer Services

Access the app publicly using the EXTERNAL-IP from GKE
