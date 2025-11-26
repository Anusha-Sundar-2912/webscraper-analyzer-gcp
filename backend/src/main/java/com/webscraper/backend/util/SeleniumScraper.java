package com.webscraper.backend.util;

import java.time.Duration;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.PageLoadStrategy;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class SeleniumScraper {

    public static class SeleniumResult {
        public String html;
        public byte[] screenshot;
    }

    public static SeleniumResult scrape(String url, boolean headless) throws Exception {

        ChromeOptions options = new ChromeOptions();

        // ===== Required for GKE / Docker =====
        options.addArguments("--headless=new");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");
        options.addArguments("--disable-gpu");
        options.addArguments("--remote-allow-origins=*");
        options.addArguments("--disable-notifications");
        options.addArguments("--window-size=1920,1080");

        // ===== Anti-bot User Agent =====
        options.addArguments(
                "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                        + "AppleWebKit/537.36 (KHTML, like Gecko) "
                        + "Chrome/125 Safari/537.36"
        );
        options.addArguments("accept-language=en-US,en;q=0.9");

        // ===== Anti-detection =====
        options.addArguments("--disable-blink-features=AutomationControlled");
        options.setExperimentalOption("excludeSwitches", new String[]{"enable-automation"});
        options.setExperimentalOption("useAutomationExtension", false);

        options.setPageLoadStrategy(PageLoadStrategy.NORMAL);

        System.setProperty("webdriver.chrome.driver", "/usr/bin/chromedriver");

        WebDriver driver = new ChromeDriver(options);
        SeleniumResult result = new SeleniumResult();

        try {
            driver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(45));
            driver.get(url);

            JavascriptExecutor js = (JavascriptExecutor) driver;

            // ===== Anti-bot bypass (Flipkart/Instagram) =====
            try {
                js.executeScript("Object.defineProperty(navigator,'webdriver',{get:()=>undefined});");
                js.executeScript("window.navigator.chrome = {runtime: {}};");
                js.executeScript("document.body.dispatchEvent(new Event('mousemove'));");
                js.executeScript("document.body.dispatchEvent(new Event('scroll'));");
            } catch (Exception ignored) {}

            // ===== Wait for BODY =====
            try {
                new WebDriverWait(driver, Duration.ofSeconds(20))
                        .until(ExpectedConditions.presenceOfElementLocated(By.tagName("body")));
            } catch (Exception ignored) {}

            // ===== Wait for document.readyState =====
            waitForPageReady(js);

            // ===== Extra delay for JS-heavy sites =====
            if (isSlowDynamicSite(url)) {
                Thread.sleep(3500);
            }

            // ===== Scroll to load dynamic content =====
            long lastHeight = (long) js.executeScript("return document.body.scrollHeight");
            for (int i = 0; i < 10; i++) {
                js.executeScript("window.scrollTo(0, document.body.scrollHeight)");
                Thread.sleep(600);

                long newHeight = (long) js.executeScript("return document.body.scrollHeight");
                if (newHeight == lastHeight) break;
                lastHeight = newHeight;
            }
            js.executeScript("window.scrollTo(0, 0)");
            Thread.sleep(400);

            // ===== Wait until DOM has real content =====
            try {
                new WebDriverWait(driver, Duration.ofSeconds(12))
                        .until(d -> ((JavascriptExecutor) d)
                                .executeScript("return document.body.innerText.length")
                                .toString().length() > 500);
            } catch (Exception ignored) {}

            // ===== Extract HTML =====
            String html = driver.getPageSource();
            if (html == null || html.isBlank()) {
                html = "<html><body>EMPTY_HTML</body></html>";
            }
            result.html = html;

            // ===== Wait before screenshot (important) =====
            try {
                Thread.sleep(1200);
            } catch (Exception ignored) {}

            // ===== Screenshot =====
            try {
                result.screenshot =
                        ((TakesScreenshot) driver).getScreenshotAs(OutputType.BYTES);
            } catch (Exception e) {
                result.screenshot = null;
            }

            return result;

        } finally {
            try { driver.quit(); } catch (Exception ignored) {}
        }
    }

    private static void waitForPageReady(JavascriptExecutor js) {
        try {
            for (int i = 0; i < 30; i++) {
                if ("complete".equals(js.executeScript("return document.readyState;"))) return;
                Thread.sleep(200);
            }
        } catch (Exception ignored) {}
    }

    private static boolean isSlowDynamicSite(String url) {
        url = url.toLowerCase();
        return url.contains("instagram.com")
                || url.contains("pinterest.com")
                || url.contains("linkedin.com")
                || url.contains("twitter.com")
                || url.contains("x.com")
                || url.contains("tiktok.com")
                || url.contains("youtube.com")
                || url.contains("flipkart.com");
    }
}
