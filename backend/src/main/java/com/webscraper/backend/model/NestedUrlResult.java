package com.webscraper.backend.model;

import java.util.List;
import java.util.Map;

import lombok.Data;

@Data
public class NestedUrlResult {
    private String url;                  // nested URL
    private String title;                // title of nested page
    private String description;          // description meta
    private Map<String, Integer> keywordCounts;  // keyword counts
    private List<String> dateMatches;    // detected dates
    private String screenshotUrl;        // 🔥 added screenshot support
}
