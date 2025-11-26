package com.webscraper.backend.model;

import java.util.List;
import java.util.Map;

import lombok.Data;

@Data
public class AnalysisResponse {

    private String url;
    private String title;
    private String description;

    private Map<String, Integer> keywordCounts;

    private List<String> dateMatches;
    private List<NestedUrlResult> nestedResults;

    private int retryAttempts;

    private String jsonUrl;
    private String csvUrl;
    private String pdfUrl;
    private String screenshotUrl;

}
