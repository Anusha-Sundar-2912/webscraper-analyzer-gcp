package com.webscraper.backend.util;

import java.util.concurrent.Callable;

public class RetryUtil {

    public static <T> T executeWithRetry(Callable<T> action, int maxAttempts) throws Exception {
        Exception lastException = null;

        for (int attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                return action.call();
            } catch (Exception e) {
                lastException = e;

                // exponential backoff: 1s → 2s → 4s
                long delay = (long) Math.pow(2, attempt - 1) * 1000;
                Thread.sleep(delay);
            }
        }
        throw lastException;
    }
}
