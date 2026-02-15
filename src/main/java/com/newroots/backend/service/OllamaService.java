package com.newroots.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;
import java.util.List;

@Service
public class OllamaService {

    private static final Logger log = LoggerFactory.getLogger(OllamaService.class);

    private final WebClient webClient;

    @Value("${ollama.base-url:http://localhost:11434}")
    private String ollamaBaseUrl;

    @Value("${ollama.model:mistral}")
    private String model;

    public OllamaService() {
        this.webClient = WebClient.builder().build();
    }

    public String generateReply(String message, String language) {
        // If Ollama is not configured, return a simulated reply for local development
        if (ollamaBaseUrl == null || ollamaBaseUrl.isBlank()) {
            if (language != null && language.toLowerCase().startsWith("es")) {
                return "Respuesta simulada en español para: " + message;
            }
            return "Simulated AI response for: " + message;
        }

        String prompt = buildPrompt(message, language);

        Map<String, Object> requestBody = Map.of(
                "model", model,
                "prompt", prompt,
                "stream", false,
                "temperature", 0.7
        );

        try {
            log.info("Calling Ollama at {} with model {}", ollamaBaseUrl, model);
            
            Map<String, Object> response = webClient.post()
                    .uri(ollamaBaseUrl + "/api/generate")
                    .header("Content-Type", "application/json")
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (response == null) {
                log.warn("Ollama response was null");
                throw new RuntimeException("Empty response from Ollama");
            }

            Object responseText = response.get("response");
            if (responseText == null) {
                log.warn("Ollama returned no response field: {}", response);
                throw new RuntimeException("No response field returned");
            }

            String reply = responseText.toString().trim();
            log.info("Ollama replied successfully");
            return reply;

        } catch (WebClientResponseException we) {
            int status = we.getRawStatusCode();
            log.error("Ollama returned status {} - Make sure Ollama is running at {}", 
                    status, ollamaBaseUrl);
            throw new RuntimeException("Ollama connection failed. Is it running at " + ollamaBaseUrl + "?");
        } catch (Exception e) {
            log.error("Ollama call failed: {}", e.getMessage());
            log.error("Make sure Ollama is running with: ollama serve");
            log.error("And the model is pulled with: ollama pull " + model);
            throw new RuntimeException("Ollama call failed: " + e.getMessage());
        }
    }

    private String buildPrompt(String message, String language) {
        String systemPrompt = "You are a helpful AI assistant helping immigrants find resources safely. " +
                "Provide clear, helpful, and safe guidance. Keep responses concise.";
        
        if (language != null && language.toLowerCase().startsWith("es")) {
            systemPrompt = "Eres un asistente de IA útil que ayuda a los inmigrantes a encontrar recursos de forma segura. " +
                    "Proporciona orientación clara, útil y segura. Mantén las respuestas concisas.";
        }
        
        return systemPrompt + "\n\nUser question: " + message;
    }
}
