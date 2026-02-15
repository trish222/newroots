package com.newroots.backend.controller;

import com.newroots.backend.model.ChatRequest;
import com.newroots.backend.model.ChatResponse;
import com.newroots.backend.service.ChatService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/chat")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping
    public ChatResponse chat(@RequestBody ChatRequest request) {

        String reply = chatService.generateReply(
                request.getMessage(),
                request.getLanguage());

        return new ChatResponse(reply);
    }
}
