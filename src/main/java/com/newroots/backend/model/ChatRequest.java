package com.newroots.backend.model;

public class ChatRequest {

    private String message;
    private String language;

    public String getMessage() {
        return message;
    }

    public String getLanguage() {
        return language;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setLanguage(String language) {
        this.language = language;
    }
}
