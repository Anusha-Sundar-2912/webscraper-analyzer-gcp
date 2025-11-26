package com.webscraper.backend.util;

import java.io.IOException;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.net.ssl.*;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import com.webscraper.backend.model.NestedUrlResult;

public class JsoupScraper {

    // ======================================================
    // IGNORE ALL SSL CERTIFICATES (Fix Amazon / CME / Flipkart)
    // ======================================================
    private static SSLContext createIgnoreSSL() {
        try {
            TrustManager[] trustAllCerts = new TrustManager[]{
                new X509TrustManager() {
                    public java.security.cert.X509Certificate[] getAcceptedIssuers() { return new java.security.cert.X509Certificate[0]; }
                    public void checkClientTrusted(java.security.cert.X509Certificate[] certs, String authType) {}
                    public void checkServerTrusted(java.security.cert.X509Certificate[] certs, String authType) {}
                }
            };

            SSLContext sc = SSLContext.getInstance("TLS");
            sc.init(null, trustAllCerts, new java.security.SecureRandom());
            return sc;

        } catch (Exception e) {
            return null;
        }
    }

    private static final SSLContext sslContext = createIgnoreSSL();

    // ======================================================
    // FETCH PAGE — SUPER BOOSTED (WORKS FOR ALL WEBSITES)
    // ======================================================
    public static Document fetch(String url) throws IOException {

        return Jsoup
                .connect(url)
                .timeout(20000)
                .ignoreContentType(true)
                .ignoreHttpErrors(true)
                .followRedirects(true)
                .sslSocketFactory(sslContext.getSocketFactory())   // ⭐ FIX SSL websites (Amazon / Flipkart / CME)
                .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123 Safari/537.36")
                .header("Accept-Language", "en-US,en;q=0.9")
                .header("Cache-Control", "no-cache")
                .get();
    }


    // ========== TITLE ==========
    public static String extractTitle(Document doc) {
        return doc.title() != null ? doc.title() : "N/A";
    }

    // ========== DESCRIPTION ==========
    public static String extractDescription(Document doc) {

        Element m1 = doc.selectFirst("meta[name=description]");
        Element m2 = doc.selectFirst("meta[property=og:description]");
        Element m3 = doc.selectFirst("meta[name=twitter:description]");

        if (m1 != null && !m1.attr("content").isBlank()) return m1.attr("content");
        if (m2 != null && !m2.attr("content").isBlank()) return m2.attr("content");
        if (m3 != null && !m3.attr("content").isBlank()) return m3.attr("content");

        // ⭐ Fallback: use first paragraph text
        Element p = doc.selectFirst("p");
        if (p != null) return p.text();

        return "N/A";
    }


    // ========== KEYWORD COUNT ==========
    public static Map<String, Integer> countKeywords(String html, List<String> keywords) {

        Map<String, Integer> map = new HashMap<>();

        Document doc = Jsoup.parse(html);
        String text = doc.body().text().toLowerCase();

        text = text.replaceAll("[^a-z0-9\\s]", " ");

        for (String k : keywords) {
            if (k == null || k.isBlank()) {
                map.put(k, 0);
                continue;
            }

            Pattern p = Pattern.compile("\\b" + Pattern.quote(k.toLowerCase()) + "\\b", Pattern.CASE_INSENSITIVE);
            Matcher m = p.matcher(text);

            int count = 0;
            while (m.find()) count++;

            map.put(k, count);
        }

        return map;
    }


    // ========== DATE FINDER ==========
    public static List<String> findDates(String html) {

        List<String> out = new ArrayList<>();

        String regex =
            "\\b(\\d{1,2}[/-]\\d{1,2}[/-]\\d{2,4})\\b" +
            "|\\b(\\d{4}-\\d{2}-\\d{2})\\b" +
            "|\\b(\\d{1,2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)[a-z]* \\d{4})\\b" +
            "|\\b((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)[a-z]* \\d{1,2},? \\d{4})\\b";

        Pattern p = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);
        Matcher m = p.matcher(html);

        while (m.find()) out.add(m.group());

        return out;
    }


    // ========== NESTED LINKS ==========
    public static List<String> extractNestedUrls(Document doc, String base) {
        List<String> list = new ArrayList<>();
        for (Element a : doc.select("a[href]")) {
            String abs = a.absUrl("href");

            if (abs.startsWith(base) && !abs.equals(base))
                list.add(abs);
        }
        return list.stream().distinct().limit(5).toList();
    }


    // ========== SCRAPE NESTED ==========
    public static NestedUrlResult scrapeNested(String url, List<String> keywords) throws Exception {

        Document doc = fetch(url);
        String html = doc.html();

        NestedUrlResult r = new NestedUrlResult();
        r.setUrl(url);
        r.setTitle(extractTitle(doc));
        r.setDescription(extractDescription(doc));
        r.setKeywordCounts(countKeywords(html, keywords));
        r.setDateMatches(findDates(html));

        return r;
    }
}
