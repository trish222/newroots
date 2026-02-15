package com.newroots.backend.service;

import org.springframework.stereotype.Service;

@Service
public class ChatService {

    private final OllamaService ollamaService;

    public ChatService(OllamaService ollamaService) {
        this.ollamaService = ollamaService;
    }

    public String generateReply(String message, String language) {
        return ollamaService.generateReply(message, language);
    }
}
