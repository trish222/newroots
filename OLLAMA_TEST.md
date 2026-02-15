# Ollama Functional Test & Verification Guide

This guide ensures Ollama is fully functional with multilingual support for the NewRoots AI chatbot.

## Prerequisites Checklist

- [ ] Ollama downloaded from [ollama.ai](https://ollama.ai)
- [ ] Ollama installed and launched on your system
- [ ] Java 21+ installed (`java -version`)
- [ ] Maven available (`./mvnw -version`)
- [ ] Node.js/npm installed (`npm -v`)

## Step 1: Install & Start Ollama

### 1.1 Download Ollama
Go to [ollama.ai](https://ollama.ai) and download for your OS (Windows, macOS, Linux).

### 1.2 Launch Ollama Application
- **macOS**: Click the Ollama icon in Applications
- **Linux**: Run `ollama serve` in terminal
- **Windows**: Launch the Ollama app from Start menu

### 1.3 Pull a Multilingual Model

Open a terminal and run:

```bash
ollama pull mistral
```

This downloads the **Mistral 7B** model (~4GB), which has excellent multilingual support including:
- English
- Spanish (for immigrant support)
- French
- German
- Italian
- Dutch
- Portuguese
- And more...

**Alternative models** if you want different characteristics:

```bash
# Smaller & faster (better for laptops)
ollama pull neural-chat

# Better quality (slower)
ollama pull llama2

# Great for dialogue
ollama pull openchat
```

### 1.4 Verify Ollama is Running

In a terminal, run:

```bash
curl http://localhost:11434/api/tags
```

You should see JSON output with your installed models. Example:
```json
{
  "models": [
    {
      "name": "mistral:latest",
      "modified_at": "2024-02-15T10:00:00Z",
      "size": 4109959168,
      "digest": "..."
    }
  ]
}
```

If this fails, make sure `ollama serve` is still running.

---

## Step 2: Start the Backend

### 2.1 Configure Environment (if needed)

```bash
cd /Users/trishnguyen/newroots

# Set Ollama configuration (optional - defaults work fine)
export OLLAMA_BASE_URL="http://localhost:11434"
export OLLAMA_MODEL="mistral"
```

### 2.2 Start the Spring Boot Backend

```bash
# Make sure ollama serve is running in another terminal first!
./mvnw spring-boot:run -Dspring-boot.run.arguments=--server.port=8081
```

Wait for this log message:
```
Started BackendApplication in X.XXX seconds
```

### 2.3 Verify Backend is Running

```bash
curl http://localhost:8081/
```

Should return:
```
NewRoots Backend is running!
```

---

## Step 3: Test Chat Endpoint

### 3.1 Test English Query

```bash
curl -X POST http://localhost:8081/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What is health insurance?","language":"en"}'
```

Expected response:
```json
{
  "reply": "Health insurance is a contract between you and an insurance company where you pay a regular premium in exchange for the company covering some or all of your medical costs. This can include doctor visits, hospital stays, medications, and preventive care..."
}
```

### 3.2 Test Spanish Query (Multilingual)

```bash
curl -X POST http://localhost:8081/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"¿Qué es el seguro de salud?","language":"es"}'
```

Expected response (in Spanish):
```json
{
  "reply": "El seguro de salud es un contrato entre usted y una compañía de seguros en el que paga una prima regular a cambio de que la compañía cubra algunos o todos sus gastos médicos. Esto puede incluir visitas al médico, hospitalizaciones, medicamentos y cuidados preventivos..."
}
```

### 3.3 Test with Different Languages

The backend's `buildPrompt()` method handles Spanish (`es`) explicitly. For other languages, Ollama's multilingual capabilities handle them:

```bash
# French
curl -X POST http://localhost:8081/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Qu'\''est-ce que l'\''assurance maladie?","language":"fr"}'

# Portuguese
curl -X POST http://localhost:8081/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"O que é seguro de saúde?","language":"pt"}'
```

---

## Step 4: Start Frontend (Optional)

### 4.1 Start Vite Dev Server

```bash
# In a new terminal
cd /Users/trishnguyen/newroots
npm run dev
```

You should see:
```
VITE v5.X.X  ready in XXX ms

➜  Local:   http://localhost:5174/
```

### 4.2 Open in Browser

Go to: **http://localhost:5174/**

Test the chat interface:
1. Type a question in the chat box
2. Click Send or press Enter
3. The chatbot will use Ollama to respond

Click the quick prompts to test predefined questions:
- 🏥 Find health insurance
- 🚗 I had a car accident
- ⚖️ Need legal help
- 📊 Help with taxes
- 👨‍⚕️ Find a doctor
- 🤝 Community resources

---

## Troubleshooting

### "Ollama connection failed" Error

**Problem**: Backend can't reach Ollama

**Solutions**:
1. Make sure `ollama serve` is running
2. Verify Ollama is on port `11434`:
   ```bash
   curl http://localhost:11434/api/tags
   ```
3. Check if port is different:
   ```bash
   lsof -i :11434  # macOS/Linux
   netstat -ano | findstr :11434  # Windows
   ```
4. Update config if needed:
   ```bash
   # application.properties or environment variable
   export OLLAMA_BASE_URL="http://localhost:11435"  # if using different port
   ```

### "Model not found" Error

**Problem**: Backend can't find the specified model

**Solutions**:
1. Verify model is installed:
   ```bash
   ollama list
   ```
2. Pull the model:
   ```bash
   ollama pull mistral
   ```
3. Check model name in `application.properties` matches exactly

### Very Slow Responses

**Problem**: Model is too large for your system

**Solutions**:
1. Stop current model: Stop `ollama serve` and restart
2. Use a smaller model:
   ```bash
   ollama pull neural-chat  # Much smaller and faster
   ```
3. Update config:
   ```bash
   # Edit src/main/resources/application.properties
   ollama.model=neural-chat
   ```
4. Rebuild and restart backend

### Port Already in Use

**Problem**: Port 8081 is already occupied

**Solutions**:
```bash
# Find what's using port 8081
lsof -i :8081  # macOS/Linux
netstat -ano | findstr :8081  # Windows

# Use a different port
./mvnw spring-boot:run -Dspring-boot.run.arguments=--server.port=8082

# Update vite.config.ts proxy port to 8082:
# server: {
#   proxy: {
#     '/chat': {
#       target: 'http://localhost:8082',
```

---

## Performance Tips

### For Better Response Speed
```bash
# Use neural-chat model (smaller, faster)
ollama pull neural-chat

# Edit src/main/resources/application.properties
ollama.model=neural-chat
```

### For Better Response Quality
```bash
# Use llama2 (larger, higher quality)
ollama pull llama2

# Edit src/main/resources/application.properties
ollama.model=llama2
```

### System Requirements

| Model | Size | RAM Needed | Speed | Quality |
|-------|------|-----------|-------|---------|
| neural-chat | 4GB | 8GB | Fast ⚡ | Good |
| mistral | 4GB | 8GB | Medium | Very Good |
| llama2 | 4GB | 16GB | Slow | Excellent |
| openchat | 4GB | 8GB | Medium | Good |

---

## Architecture Overview

```
Frontend (React + Vite)
       ↓ (fetch /chat)
Backend (Spring Boot)
       ↓ (REST call)
OllamaService
       ↓ (HTTP POST to /api/generate)
Ollama Server (Local, Port 11434)
       ↓
LLM Model (mistral/neural-chat/llama2)
       ↓ (text generation)
Response back through all layers
```

---

## Multilingual Features

### Current Support

The backend explicitly handles **Spanish (es)** with translated system prompts:

```
English: "You are a helpful AI assistant helping immigrants find resources safely..."
Spanish: "Eres un asistente de IA útil que ayuda a los inmigrantes a encontrar recursos..."
```

### Adding More Languages

To add support for another language, edit [OllamaService.java](src/main/java/com/newroots/backend/service/OllamaService.java):

```java
private String buildPrompt(String message, String language) {
    String systemPrompt = "You are a helpful AI assistant...";
    
    if (language != null && language.toLowerCase().startsWith("es")) {
        systemPrompt = "Eres un asistente de IA útil...";
    }
    
    // ADD HERE:
    if (language != null && language.toLowerCase().startsWith("fr")) {
        systemPrompt = "Vous êtes un assistant IA utile...";
    }
    
    return systemPrompt + "\n\nUser question: " + message;
}
```

### Ollama's Multilingual Capability

Mistral (and most modern LLMs) handle multiple languages natively:
- **Spanish**: Works great (native support)
- **French, Portuguese, German**: Excellent
- **Italian, Dutch, Polish**: Very good
- **Vietnamese, Tagalog, Korean**: Supported
- **Chinese, Japanese, Arabic**: Supported but variable quality

To test any language, just send a query with `language` parameter.

---

## Testing Checklist

- [ ] Ollama is running (`ollama serve`)
- [ ] Model is pulled (`ollama list` shows mistral)
- [ ] Backend starts without errors
- [ ] English chat test returns response
- [ ] Spanish chat test returns Spanish response
- [ ] Frontend loads and sends messages
- [ ] Chat responses appear in UI
- [ ] Response time is acceptable (< 10 seconds)

---

## Next Steps

1. ✅ Complete all tests above
2. 📝 Add more languages to `buildPrompt()` method if needed
3. 🚀 Deploy to production (ensure Ollama runs on server)
4. 📊 Monitor response times and adjust model if needed
5. 🔐 Ensure Ollama is not exposed publicly (firewall rules)

---

## See Also

- [OLLAMA_SETUP.md](./OLLAMA_SETUP.md) - Detailed setup documentation
- [OLLAMA_QUICKSTART.md](./OLLAMA_QUICKSTART.md) - Quick start guide
- [src/main/java/com/newroots/backend/service/OllamaService.java](src/main/java/com/newroots/backend/service/OllamaService.java) - Service implementation
