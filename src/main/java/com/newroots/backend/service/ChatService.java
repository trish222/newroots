package com.newroots.backend.service;

import org.springframework.stereotype.Service;

@Service
public class ChatService {

    public String generateReply(String message, String language) {

        if (language.equalsIgnoreCase("spanish")) {
            return "Respuesta simulada en español para: " + message;
        }

        return "Simulated AI response for: " + message;
    }
}
