package com.webscraper.backend.service;

import java.util.ArrayList;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.stereotype.Service;

import com.webscraper.backend.model.AnalysisResponse;
import com.webscraper.backend.model.NestedUrlResult;
import com.webscraper.backend.model.ScrapeRequest;

import com.webscraper.backend.util.CsvGenerator;
import com.webscraper.backend.util.GCPStorageService;
import com.webscraper.backend.util.JsonGenerator;
import com.webscraper.backend.util.JsoupScraper;
import com.webscraper.backend.util.PdfGenerator;
import com.webscraper.backend.util.RetryUtil;
import com.webscraper.backend.util.SeleniumScraper;

@Service
public class WebScraperServiceImpl implements WebScraperService {

    private final GCPStorageService gcp;

    public WebScraperServiceImpl(GCPStorageService gcp) {
        this.gcp = gcp;
    }

    @Override
    public AnalysisResponse analyze(ScrapeRequest request) {

        AnalysisResponse response = new AnalysisResponse();
        response.setUrl(request.getUrl());
        final int[] retryAttempts = {0};

        String html = null;
        byte[] screenshotBytes = null;

        try {

            // ======================================================
            // JSOUP MODE
            // ======================================================
            if (request.getMode().equalsIgnoreCase("jsoup")) {

                Document doc = RetryUtil.executeWithRetry(() -> {
                    retryAttempts[0]++;
                    return JsoupScraper.fetch(request.getUrl());
                }, 3);

                html = doc.html();

                // Fallback meta extraction for tricky sites
                response.setTitle(
                        JsoupScraper.extractTitle(doc)
                );

                response.setDescription(
                        JsoupScraper.extractDescription(doc)
                );

                response.setKeywordCounts(
                        JsoupScraper.countKeywords(html, request.getKeywords())
                );

                response.setDateMatches(
                        JsoupScraper.findDates(html)
                );

                if (request.isDeep()) {
                    List<String> nestedUrls = JsoupScraper.extractNestedUrls(doc, request.getUrl());
                    response.setNestedResults(
                            scrapeNestedJsoup(nestedUrls, request.getKeywords())
                    );
                }
            }

            // ======================================================
            // SELENIUM MODE
            // ======================================================
            else if (request.getMode().equalsIgnoreCase("selenium")) {

                SeleniumScraper.SeleniumResult result =
                        RetryUtil.executeWithRetry(() -> {
                            retryAttempts[0]++;
                            return SeleniumScraper.scrape(request.getUrl(), true);
                        }, 2);

                html = result.html;
                screenshotBytes = result.screenshot;

                Document doc = Jsoup.parse(html);

                // Fallback for JS-heavy websites
                String title = JsoupScraper.extractTitle(doc);
                if (title == null || title.isBlank()) {
                    title = doc.select("meta[property=og:title]").attr("content");
                }
                response.setTitle(title);

                String desc = JsoupScraper.extractDescription(doc);
                if (desc == null || desc.isBlank()) {
                    desc = doc.select("meta[property=og:description]").attr("content");
                }
                response.setDescription(desc);

                response.setKeywordCounts(
                        JsoupScraper.countKeywords(html, request.getKeywords())
                );

                response.setDateMatches(
                        JsoupScraper.findDates(html)
                );

                if (request.isDeep()) {
                    List<String> nestedUrls = JsoupScraper.extractNestedUrls(doc, request.getUrl());
                    response.setNestedResults(
                            scrapeNestedSelenium(nestedUrls, request.getKeywords())
                    );
                }
            }

            response.setRetryAttempts(retryAttempts[0]);

            // ===== Upload JSON
            byte[] jsonFile = JsonGenerator.generateJson(response);
            response.setJsonUrl(gcp.uploadBytes(jsonFile, "application/json", "json"));

            // ===== Upload CSV
            byte[] csvFile = CsvGenerator.generateCsv(response);
            response.setCsvUrl(gcp.uploadBytes(csvFile, "text/csv", "csv"));

            // ===== Upload PDF
            byte[] pdfFile = PdfGenerator.generatePdf(response);
            response.setPdfUrl(gcp.uploadBytes(pdfFile, "application/pdf", "pdf"));

            // ===== Upload Screenshot (only Selenium)
            if (screenshotBytes != null) {
                response.setScreenshotUrl(
                        gcp.uploadBytes(screenshotBytes, "image/png", "png")
                );
            }

        } catch (Exception e) {
            throw new RuntimeException("Scraping failed: " + e.getMessage());
        }

        return response;
    }

    // ======================================================
    // MULTI URL
    // ======================================================
    @Override
    public List<AnalysisResponse> analyzeMulti(ScrapeRequest request) {
        List<String> urls = request.getUrls();
        List<AnalysisResponse> results = new ArrayList<>();

        if (urls == null || urls.isEmpty()) {
            throw new RuntimeException("No URLs provided for multi-url analysis.");
        }

        for (String u : urls) {
            ScrapeRequest req = new ScrapeRequest();
            req.setUrl(u);
            req.setKeywords(request.getKeywords());
            req.setMode(request.getMode());
            req.setDeep(request.isDeep());

            results.add(analyze(req));
        }

        return results;
    }

    // ======================================================
    // NESTED: JSOUP
    // ======================================================
    private List<NestedUrlResult> scrapeNestedJsoup(List<String> urls, List<String> keywords) {

        List<NestedUrlResult> list = new ArrayList<>();

        for (String nested : urls) {
            try {
                Document doc = JsoupScraper.fetch(nested);
                String html = doc.html();

                NestedUrlResult nr = new NestedUrlResult();
                nr.setUrl(nested);
                nr.setTitle(JsoupScraper.extractTitle(doc));
                nr.setDescription(JsoupScraper.extractDescription(doc));
                nr.setKeywordCounts(JsoupScraper.countKeywords(html, keywords));
                nr.setDateMatches(JsoupScraper.findDates(html));
                nr.setScreenshotUrl(null);

                list.add(nr);

            } catch (Exception ignore) {}
        }
        return list;
    }

    // ======================================================
    // NESTED: SELENIUM
    // ======================================================
    private List<NestedUrlResult> scrapeNestedSelenium(List<String> urls, List<String> keywords) {

        List<NestedUrlResult> list = new ArrayList<>();

        for (String nested : urls) {
            try {

                SeleniumScraper.SeleniumResult res = SeleniumScraper.scrape(nested, true);
                Document doc = Jsoup.parse(res.html);

                NestedUrlResult nr = new NestedUrlResult();
                nr.setUrl(nested);

                String title = JsoupScraper.extractTitle(doc);
                if (title == null || title.isBlank()) {
                    title = doc.select("meta[property=og:title]").attr("content");
                }
                nr.setTitle(title);

                String desc = JsoupScraper.extractDescription(doc);
                if (desc == null || desc.isBlank()) {
                    desc = doc.select("meta[property=og:description]").attr("content");
                }
                nr.setDescription(desc);

                nr.setKeywordCounts(JsoupScraper.countKeywords(res.html, keywords));
                nr.setDateMatches(JsoupScraper.findDates(res.html));

                if (res.screenshot != null) {
                    nr.setScreenshotUrl(
                            gcp.uploadBytes(res.screenshot, "image/png", "png")
                    );
                }

                list.add(nr);

            } catch (Exception ignore) {}
        }

        return list;
    }
}
