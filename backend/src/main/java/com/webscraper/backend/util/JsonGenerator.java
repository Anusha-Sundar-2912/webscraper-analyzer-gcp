package com.webscraper.backend.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.webscraper.backend.model.AnalysisResponse;

public class JsonGenerator {

    public static byte[] generateJson(AnalysisResponse response) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writerWithDefaultPrettyPrinter().writeValueAsBytes(response);
    }
}
