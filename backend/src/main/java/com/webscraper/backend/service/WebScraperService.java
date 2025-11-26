package com.webscraper.backend.service;

import java.util.List;

import com.webscraper.backend.model.AnalysisResponse;
import com.webscraper.backend.model.ScrapeRequest;

public interface WebScraperService {

    // Single URL scrape (already implemented)
    AnalysisResponse analyze(ScrapeRequest request);

    // Multi-URL scrape (needed for frontend + API)
    List<AnalysisResponse> analyzeMulti(ScrapeRequest request);
}
