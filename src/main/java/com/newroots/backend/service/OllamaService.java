package com.newroots.backend.service;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Service
public class OllamaService {

    private static final Logger log = LoggerFactory.getLogger(OllamaService.class);

    private final RestTemplate restTemplate;

    @Value("${ollama.base-url:http://localhost:11434}")
    private String ollamaBaseUrl;

    @Value("${ollama.model:mistral}")
    private String model;

    public OllamaService() {
        this.restTemplate = new RestTemplate();
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
            
            Map<String, Object> response = restTemplate.postForObject(
                    ollamaBaseUrl + "/api/generate",
                    requestBody,
                    Map.class
            );

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

        } catch (RestClientException e) {
            log.error("Ollama connection failed - Make sure Ollama is running at {}", 
                    ollamaBaseUrl);
            log.error("Error: {}", e.getMessage());
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
        
        if (language != null) {
            String lang = language.toLowerCase().trim();
            
            // Spanish
            if (lang.startsWith("es")) {
                systemPrompt = "Eres un asistente de IA útil que ayuda a los inmigrantes a encontrar recursos de forma segura. " +
                        "Proporciona orientación clara, útil y segura. Mantén las respuestas concisas.";
            }
            // French
            else if (lang.startsWith("fr")) {
                systemPrompt = "Vous êtes un assistant IA utile qui aide les immigrants à trouver des ressources en toute sécurité. " +
                        "Fournissez des conseils clairs, utiles et sûrs. Gardez les réponses concises.";
            }
            // Portuguese
            else if (lang.startsWith("pt")) {
                systemPrompt = "Você é um assistente de IA útil que ajuda imigrantes a encontrar recursos com segurança. " +
                        "Forneça orientação clara, útil e segura. Mantenha as respostas concisas.";
            }
            // German
            else if (lang.startsWith("de")) {
                systemPrompt = "Sie sind ein hilfreicher KI-Assistent, der Einwanderern hilft, Ressourcen sicher zu finden. " +
                        "Geben Sie klare, hilfreiche und sichere Anleitungen. Halten Sie die Antworten prägnant.";
            }
            // Italian
            else if (lang.startsWith("it")) {
                systemPrompt = "Sei un assistente IA utile che aiuta gli immigrati a trovare risorse in sicurezza. " +
                        "Fornisci indicazioni chiare, utili e sicure. Mantieni le risposte concise.";
            }
            // Chinese (Simplified)
            else if (lang.startsWith("zh")) {
                systemPrompt = "你是一个有帮助的AI助手，帮助移民安全地找到资源。提供清晰、有用和安全的指导。保持答案简洁。";
            }
            // Vietnamese
            else if (lang.startsWith("vi")) {
                systemPrompt = "Bạn là một trợ lý AI hữu ích giúp những người nhập cư tìm tài nguyên một cách an toàn. " +
                        "Cung cấp hướng dẫn rõ ràng, hữu ích và an toàn. Giữ cho các câu trả lời ngắn gọn.";
            }
            // Korean
            else if (lang.startsWith("ko")) {
                systemPrompt = "당신은 이민자들이 안전하게 자원을 찾을 수 있도록 도와주는 유용한 AI 어시스턴트입니다. " +
                        "명확하고 도움이 되며 안전한 지침을 제공하세요. 답변을 간결하게 유지하세요.";
            }
            // Tagalog/Filipino
            else if (lang.startsWith("tl") || lang.startsWith("fil")) {
                systemPrompt = "Kayo ay isang kapaki-pakinabang na tulong na AI na tumutulong sa mga imigrante na mahanap ang mga mapagkukunan ng ligtas. " +
                        "Magbigay ng malinaw, kapaki-pakinabang, at ligtas na gabay. Panatilihing maikli ang mga sagot.";
            }
            // Arabic
            else if (lang.startsWith("ar")) {
                systemPrompt = "أنت مساعد ذكاء اصطناعي مفيد يساعد المهاجرين على العثور على الموارد بأمان. " +
                        "قدم إرشادات واضحة ومفيدة وآمنة. احفظ الإجابات موجزة.";
            }
        }
        
        return systemPrompt + "\n\nUser question: " + message;
    }
}
