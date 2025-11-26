package com.webscraper.backend.util;

import com.webscraper.backend.model.AnalysisResponse;

public class CsvGenerator {

    public static byte[] generateCsv(AnalysisResponse response) throws Exception {

        StringBuilder sb = new StringBuilder();

        sb.append("Keyword,Count\n");

        response.getKeywordCounts().forEach((k, v) ->
                sb.append(k).append(",").append(v).append("\n")
        );

        return sb.toString().getBytes();
    }
}
