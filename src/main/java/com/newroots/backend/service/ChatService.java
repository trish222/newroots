package com.newroots.backend.service;

import org.springframework.stereotype.Service;

@Service
public class ChatService {

    private final OpenAIService openAIService;

    public ChatService(OpenAIService openAIService) {
        this.openAIService = openAIService;
    }

    public String generateReply(String message, String language) {
        return openAIService.generateReply(message, language);
    }
}
