package com.webscraper.backend.model;

import java.util.List;
import java.util.Map;

import lombok.Data;

@Data
public class NestedUrlResult {
    private String url;                  
    private String title;                
    private String description;          
    private Map<String, Integer> keywordCounts;  
    private List<String> dateMatches;    
    private String screenshotUrl;        
}
