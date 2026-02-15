package com.newroots.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;

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
                // Fallback if API key not provided
                if (apiKey == null || apiKey.isBlank()) {
                        if (language != null && language.toLowerCase().startsWith("es")) {
                                return "Respuesta simulada en español para: " + message;
                        }
                        return "Simulated AI response for: " + message;
                }

                String prompt = buildPrompt(message, language);

                Map<String, Object> requestBody = Map.of(
                                "model", model,
                                "messages", new Object[] {
                                                Map.of("role", "system", "content",
                                                                "You are a helpful AI assistant helping immigrants find resources safely."),
                                                Map.of("role", "user", "content", prompt)
                                });

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
                                return "(AI service error) Empty response";
                        }

                        var choices = (java.util.List<?>) response.get("choices");
                        if (choices == null || choices.isEmpty()) {
                                log.warn("OpenAI returned no choices: {}", response);
                                return "(AI service error) No choices returned";
                        }

                        var firstChoice = (Map<?, ?>) choices.get(0);
                        var messageObj = (Map<?, ?>) firstChoice.get("message");
                        if (messageObj == null || messageObj.get("content") == null) {
                                log.warn("OpenAI choice missing message content: {}", firstChoice);
                                return "(AI service error) Missing content";
                        }

                        return messageObj.get("content").toString().trim();

                } catch (Exception e) {
                        log.error("OpenAI call failed", e);
                        if (language != null && language.toLowerCase().startsWith("es")) {
                                return "Respuesta simulada en español para: " + message;
                        }
                        return "(AI call failed) " + e.getMessage();
                }
        }

        private String buildPrompt(String message, String language) {
                return "Language: " + (language == null ? "en" : language) + "\nUser question: " + message +
                                "\nProvide clear, helpful, and safe guidance.";
        }
}
