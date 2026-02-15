package com.newroots.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

@Service
public class ChatService {

    private static final String OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
    private final HttpClient httpClient = HttpClient.newBuilder().followRedirects(HttpClient.Redirect.NORMAL).build();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public String generateReply(String message, String language) {
        String apiKey = System.getenv("OPENAI_API_KEY");
        String model = System.getenv().getOrDefault("OPENAI_MODEL", "gpt-3.5-turbo");
        String systemPrompt = System.getenv().getOrDefault("OPENAI_SYSTEM_PROMPT",
                "You are a helpful assistant that provides concise, actionable guidance. Keep replies short and clear.");

        if (apiKey == null || apiKey.isBlank()) {
            if (language != null && language.equalsIgnoreCase("spanish")) {
                return "Respuesta simulada en español para: " + message;
            }
            return "Simulated AI response for: " + message;
        }

        try {
            String requestBody = buildRequestBody(model, systemPrompt, message);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(OPENAI_API_URL))
                    .timeout(Duration.ofSeconds(30))
                    .header("Content-Type", "application/json")
                    .header("Authorization", "Bearer " + apiKey)
                    .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() >= 200 && response.statusCode() < 300) {
                JsonNode root = objectMapper.readTree(response.body());
                JsonNode choices = root.path("choices");
                if (choices.isArray() && choices.size() > 0) {
                    JsonNode content = choices.get(0).path("message").path("content");
                    if (!content.isMissingNode()) {
                        return content.asText().trim();
                    }
                }
            }

            return "(AI service error) " + response.body();

        } catch (IOException | InterruptedException e) {
            Thread.currentThread().interrupt();
            return "(AI call failed) " + e.getMessage();
        }
    }

    private String buildRequestBody(String model, String systemPrompt, String message) {
        StringBuilder sb = new StringBuilder();
        sb.append('{');
        sb.append("\"model\":\"").append(escapeJson(model)).append("\",");
        sb.append("\"messages\":[");
        sb.append('{');
        sb.append("\"role\":\"system\",\"content\":\"").append(escapeJson(systemPrompt)).append("\"}");
        sb.append(',');
        sb.append('{');
        sb.append("\"role\":\"user\",\"content\":\"").append(escapeJson(message)).append("\"}");
        sb.append(']');
        sb.append(",\"max_tokens\":500,\"temperature\":0.7");
        sb.append('}');
        return sb.toString();
    }

    private String escapeJson(String text) {
        if (text == null) return "";
        return text.replace("\\", "\\\\").replace("\"", "\\\"").replace("\n", "\\n").replace("\r", "");
    }
}
