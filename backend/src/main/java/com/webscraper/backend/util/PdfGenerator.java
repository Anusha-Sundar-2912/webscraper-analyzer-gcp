package com.webscraper.backend.util;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import com.webscraper.backend.model.AnalysisResponse;

import java.io.ByteArrayOutputStream;

public class PdfGenerator {

    public static byte[] generatePdf(AnalysisResponse response) throws Exception {

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        Document doc = new Document();
        PdfWriter.getInstance(doc, baos);

        doc.open();

        doc.add(new Paragraph("WebScraper Analysis Report"));
        doc.add(new Paragraph("URL: " + response.getUrl()));
        doc.add(new Paragraph("Title: " + response.getTitle()));
        doc.add(new Paragraph("Description: " + response.getDescription()));
        doc.add(new Paragraph("\nKeyword Counts:"));

        response.getKeywordCounts().forEach((k, v) -> {
            try {
                doc.add(new Paragraph(k + ": " + v));
            } catch (Exception ignored) {}
        });

        doc.add(new Paragraph("\nRegex Date Matches:"));
        response.getDateMatches().forEach(match -> {
            try {
                doc.add(new Paragraph(match));
            } catch (Exception ignored) {}
        });

        doc.close();
        return baos.toByteArray();
    }
}
