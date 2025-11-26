# ============================
# 1) BUILD STAGE
# ============================
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests


# ============================
# 2) RUNTIME STAGE (with Chrome + Driver)
# ============================
FROM eclipse-temurin:17-jdk

USER root
WORKDIR /app

# ---------------------------------------------------------
# Install Chrome dependencies (Ubuntu 24.04 compatible)
# ---------------------------------------------------------
RUN apt-get update && apt-get install -y \
    wget curl unzip gnupg ca-certificates \
    libnss3 libx11-6 libxcomposite1 libxdamage1 \
    libxrandr2 libgbm1 libasound2t64 libatk1.0-0 \
    libatk-bridge2.0-0 libcups2 libxss1 \
    libgtk-3-0 libxshmfence1 libdrm2 \
    fonts-liberation \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*


# ---------------------------------------------------------
# Install Chrome for Testing (Stable)
# ---------------------------------------------------------
RUN CFT_VERSION=$(curl -s https://googlechromelabs.github.io/chrome-for-testing/LATEST_RELEASE_STABLE) && \
    wget -q https://storage.googleapis.com/chrome-for-testing-public/${CFT_VERSION}/linux64/chrome-linux64.zip && \
    unzip chrome-linux64.zip && \
    mv chrome-linux64 /opt/chrome && \
    ln -s /opt/chrome/chrome /usr/bin/google-chrome && \
    rm chrome-linux64.zip


# ---------------------------------------------------------
# Install matching ChromeDriver (TO CORRECT PATH)
# ---------------------------------------------------------
RUN CFT_VERSION=$(curl -s https://googlechromelabs.github.io/chrome-for-testing/LATEST_RELEASE_STABLE) && \
    wget -q https://storage.googleapis.com/chrome-for-testing-public/${CFT_VERSION}/linux64/chromedriver-linux64.zip && \
    unzip chromedriver-linux64.zip && \
    mv chromedriver-linux64/chromedriver /usr/local/bin/chromedriver && \
    chmod +x /usr/local/bin/chromedriver && \
    rm -rf chromedriver-linux64 chromedriver-linux64.zip


ENV CHROME_BIN=/usr/bin/google-chrome
ENV CHROMEDRIVER=/usr/local/bin/chromedriver

# ---------------------------------------------------------
# Copy Spring Boot JAR
# ---------------------------------------------------------
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
