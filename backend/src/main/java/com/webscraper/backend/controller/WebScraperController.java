package com.webscraper.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.webscraper.backend.model.AnalysisResponse;
import com.webscraper.backend.model.ScrapeRequest;
import com.webscraper.backend.service.WebScraperService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class WebScraperController {

    private final WebScraperService scraperService;

    // ===========================
    // SINGLE URL
    // ===========================
    @PostMapping("/analyze")
    public ResponseEntity<AnalysisResponse> analyze(@Valid @RequestBody ScrapeRequest request) {

        // If frontend sent urls[] only → convert to single url
        if (request.getUrl() == null &&
                request.getUrls() != null &&
                !request.getUrls().isEmpty()) {
            request.setUrl(request.getUrls().get(0));
        }

        AnalysisResponse response = scraperService.analyze(request);
        return ResponseEntity.ok(response);
    }

    // ===========================
    // MULTI-URL SCRAPING
    // ===========================
    @PostMapping("/analyze/multi")
    public ResponseEntity<List<AnalysisResponse>> analyzeMulti(@Valid @RequestBody ScrapeRequest request) {
        List<AnalysisResponse> responses = scraperService.analyzeMulti(request);
        return ResponseEntity.ok(responses);
    }
}
