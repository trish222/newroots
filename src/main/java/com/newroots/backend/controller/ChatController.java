package com.newroots.backend.controller;

import com.newroots.backend.model.ChatRequest;
import com.newroots.backend.model.ChatResponse;
import com.newroots.backend.service.ChatService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/chat")
public class ChatController {

    private static final Logger log = LoggerFactory.getLogger(ChatController.class);

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping
    public ChatResponse chat(@RequestBody ChatRequest request) {
        try {
            String reply = chatService.generateReply(
                    request.getMessage(),
                    request.getLanguage());

            return new ChatResponse(reply != null ? reply : "(No reply)");
        } catch (Exception e) {
            log.error("Unhandled error in /chat", e);
            String fallback = (request.getLanguage() != null && request.getLanguage().toLowerCase().startsWith("es"))
                    ? "Respuesta simulada en español para: " + request.getMessage()
                    : "Simulated AI response for: " + request.getMessage();
            return new ChatResponse(fallback);
        }
    }
}
