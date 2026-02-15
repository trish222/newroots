package com.newroots.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.ZonedDateTime;
import java.time.format.DateTimeParseException;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class OpenAIService {

    private static final Logger log = LoggerFactory.getLogger(OpenAIService.class);

    private final WebClient webClient;

    @Value("${openai.api.key:}")
    private String apiKey;

    @Value("${openai.model:gpt-3.5-turbo}")
    private String model;

    public OpenAIService() {
        this.webClient = WebClient.builder()
                .baseUrl("https://api.openai.com/v1")
                .build();
    }

    public String generateReply(String message, String language) {
        // If no API key is configured, return a simulated reply for local development.
        if (apiKey == null || apiKey.isBlank()) {
            if (language != null && language.toLowerCase().startsWith("es")) {
                return "Respuesta simulada en español para: " + message;
            }
            return "Simulated AI response for: " + message;
        }

        String prompt = buildPrompt(message, language);

        Map<String, Object> requestBody = Map.of(
                "model", model,
                "messages", new Object[]{
                        Map.of("role", "system", "content",
                                "You are a helpful AI assistant helping immigrants find resources safely."),
                        Map.of("role", "user", "content", prompt)
                }
        );

        int maxAttempts = 6;
        long delayMs = 1000L;
        int attempt = 0;

        while (true) {
            try {
                Map response = webClient.post()
                        .uri("/chat/completions")
                        .header("Authorization", "Bearer " + apiKey)
                        .header("Content-Type", "application/json")
                        .bodyValue(requestBody)
                        .retrieve()
                        .bodyToMono(Map.class)
                        .block();

                if (response == null) {
                    log.warn("OpenAI response was null");
                    throw new RuntimeException("Empty response from OpenAI");
                }

                var choices = (java.util.List<?>) response.get("choices");
                if (choices == null || choices.isEmpty()) {
                    log.warn("OpenAI returned no choices: {}", response);
                    throw new RuntimeException("No choices returned");
                }

                var firstChoice = (Map<?, ?>) choices.get(0);
                var messageObj = (Map<?, ?>) firstChoice.get("message");
                if (messageObj == null || messageObj.get("content") == null) {
                    log.warn("OpenAI choice missing message content: {}", firstChoice);
                    throw new RuntimeException("Missing content in choice");
                }

                return messageObj.get("content").toString().trim();

            } catch (WebClientResponseException we) {
                int status = we.getRawStatusCode();
                log.warn("OpenAI returned status {} (attempt {}): {}", status, attempt + 1, we.getMessage());

                // Respect Retry-After header if present
                String retryAfterHeader = null;
                try {
                    retryAfterHeader = we.getHeaders().getFirst("Retry-After");
                } catch (Exception ignored) {
                }

                long sleepMs = delayMs;
                if (retryAfterHeader != null) {
                    try {
                        int seconds = Integer.parseInt(retryAfterHeader.trim());
                        sleepMs = Math.max(sleepMs, seconds * 1000L);
                    } catch (NumberFormatException nfe) {
                        try {
                            ZonedDateTime retryTime = ZonedDateTime.parse(retryAfterHeader);
                            long until = java.time.Duration.between(ZonedDateTime.now(), retryTime).toMillis();
                            if (until > 0) sleepMs = Math.max(sleepMs, until);
                        } catch (DateTimeParseException ex) {
                            // ignore parsing failure
                        }
                    }
                }

                if ((status == 429 || (status >= 500 && status < 600)) && attempt < maxAttempts - 1) {
                    attempt++;
                    long jitter = ThreadLocalRandom.current().nextLong(0, Math.max(100L, sleepMs / 2));
                    long toSleep = Math.min(60_000L, sleepMs + jitter);
                    log.info("Retrying after {} ms (including jitter {})", toSleep, jitter);
                    try {
                        Thread.sleep(toSleep);
                    } catch (InterruptedException ie) {
                        Thread.currentThread().interrupt();
                        break;
                    }
                    delayMs = Math.min(delayMs * 2, 60_000L);
                    continue;
                }
                break;
            } catch (Exception e) {
                log.error("OpenAI call failed (attempt {}): {}", attempt + 1, e.getMessage());
                if (attempt < maxAttempts - 1) {
                    attempt++;
                    long jitter = ThreadLocalRandom.current().nextLong(0, Math.max(100L, delayMs / 2));
                    long toSleep = Math.min(60_000L, delayMs + jitter);
                    try {
                        Thread.sleep(toSleep);
                    } catch (InterruptedException ie) {
                        Thread.currentThread().interrupt();
                        break;
                    }
                    delayMs = Math.min(delayMs * 2, 60_000L);
                    continue;
                }
                break;
            }
        }

        log.error("OpenAI call failed after {} attempts", maxAttempts);
        if (language != null && language.toLowerCase().startsWith("es")) {
            return "Respuesta simulada en español para: " + message;
        }
        return "(AI call failed) Too many errors or rate-limited";
    }

    private String buildPrompt(String message, String language) {
        return "Language: " + (language == null ? "en" : language) + "\nUser question: " + message +
                "\nProvide clear, helpful, and safe guidance.";
    }
}
