package com.webscraper.backend.model;

import java.util.List;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class ScrapeRequest {

    // SINGLE URL
    private String url;

    // MULTI-URL SUPPORT
    private List<String> urls;

    @NotEmpty(message = "Keywords cannot be empty")
    private List<String> keywords;

    private String mode;        // jsoup / selenium
    private boolean deep;       // true / false
}
