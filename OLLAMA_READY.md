# 🚀 Ollama + NewRoots - Complete Setup Guide

## Status: ✅ READY TO USE

Your NewRoots backend is fully configured for **Ollama with multilingual AI support**.

---

## What Has Been Set Up

### 1. **Backend Integration** ✅
- [OllamaService.java](src/main/java/com/newroots/backend/service/OllamaService.java) - Handles all Ollama API calls
- [ChatService.java](src/main/java/com/newroots/backend/service/ChatService.java) - Routes chat requests to Ollama
- [ChatController.java](src/main/java/com/newroots/backend/controller/ChatController.java) - REST endpoint at `/chat`

### 2. **Configuration** ✅
- [application.properties](src/main/resources/application.properties) - Pre-configured with:
  - `ollama.base-url=http://localhost:11434` (default Ollama port)
  - `ollama.model=mistral` (multilingual model)
  - Server port: `8081`

### 3. **Multilingual Support** ✅
Enhanced `buildPrompt()` method now supports:
- 🇬🇧 English (default)
- 🇪🇸 Spanish
- 🇫🇷 French
- 🇵🇹 Portuguese
- 🇩🇪 German
- 🇮🇹 Italian
- 🇨🇳 Chinese (Simplified)
- 🇻🇳 Vietnamese
- 🇰🇷 Korean
- 🇵🇭 Tagalog/Filipino
- 🇸🇦 Arabic

### 4. **Frontend Integration** ✅
- [ChatInterface.tsx](frontend/app/components/ChatInterface.tsx) - Sends language parameter with messages
- [vite.config.ts](vite.config.ts) - Proxies `/chat` requests to backend

### 5. **Documentation** ✅
- [OLLAMA_SETUP.md](./OLLAMA_SETUP.md) - Detailed setup guide
- [OLLAMA_QUICKSTART.md](./OLLAMA_QUICKSTART.md) - Quick start
- [OLLAMA_TEST.md](./OLLAMA_TEST.md) - **NEW** Comprehensive test & verification guide

---

## How to Run Ollama + NewRoots

You need **3 terminals** running simultaneously:

### Terminal 1: Start Ollama Server
```bash
ollama serve
```

### Terminal 2: Start Backend
```bash
cd /Users/trishnguyen/newroots
./mvnw spring-boot:run -Dspring-boot.run.arguments=--server.port=8081
```

### Terminal 3: Start Frontend
```bash
cd /Users/trishnguyen/newroots
npm run dev
```

Then open: **http://localhost:5174/**

---

## Why Ollama? Key Features

| Feature | Ollama | OpenAI |
|---------|--------|--------|
| **Cost** | Free | $$ per request |
| **Privacy** | Local (100% private) | Cloud-based |
| **Internet** | Works offline | Requires internet |
| **Speed** | Fast (local) | Faster (larger models) |
| **Customization** | Full control | Limited |
| **Multilingual** | Yes (native) | Yes |
| **Setup** | Simple | API key needed |

**For an immigrant resource app, Ollama is perfect because:**
1. ✅ Multilingual capabilities (Spanish, Vietnamese, Chinese, etc.)
2. ✅ No data sent to external servers (privacy)
3. ✅ No API keys required
4. ✅ Works offline
5. ✅ Free to use

---

## Testing Checklist

Before deploying, verify:

```bash
# 1. Ollama is running
curl http://localhost:11434/api/tags

# 2. Model is installed
ollama list

# 3. Backend starts
./mvnw spring-boot:run -Dspring-boot.run.arguments=--server.port=8081

# 4. Test English chat
curl -X POST http://localhost:8081/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What is health insurance?","language":"en"}'

# 5. Test Spanish chat (multilingual)
curl -X POST http://localhost:8081/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"¿Qué es el seguro de salud?","language":"es"}'

# 6. Frontend works
npm run dev
# Open http://localhost:5174/ and test chat interface
```

See [OLLAMA_TEST.md](./OLLAMA_TEST.md) for detailed testing guide.

---

## Model Recommendations

| Use Case | Model | Command |
|----------|-------|---------|
| **Default** (Recommended) | mistral | `ollama pull mistral` |
| Fast & Small | neural-chat | `ollama pull neural-chat` |
| Best Quality | llama2 | `ollama pull llama2` |
| Code-focused | openchat | `ollama pull openchat` |

Currently configured: **mistral** (perfect balance of speed and quality)

---

## Troubleshooting

### Problem: "Ollama connection failed"
**Solution**: Make sure `ollama serve` is running in Terminal 1

### Problem: Model not found
**Solution**: Run `ollama pull mistral` to download the model

### Problem: Very slow responses
**Solution**: Switch to smaller model `ollama pull neural-chat`

### Problem: Port already in use
**Solution**: Use different port: `./mvnw spring-boot:run -Dspring-boot.run.arguments=--server.port=8082`

See [OLLAMA_TEST.md](./OLLAMA_TEST.md) for more troubleshooting.

---

## Architecture

```
┌─────────────────────────────────────────┐
│       Frontend (React + Vite)           │
│      Sends: {message, language}         │
└──────────────┬──────────────────────────┘
               │ POST /chat
┌──────────────▼──────────────────────────┐
│    Backend (Spring Boot, Port 8081)     │
│      ChatController → ChatService        │
└──────────────┬──────────────────────────┘
               │ HTTP POST /api/generate
┌──────────────▼──────────────────────────┐
│   Ollama Server (Port 11434, Local)     │
│   Handles: Multilingual text generation │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│        LLM Model (Mistral 7B)           │
│   Generates responses in requested     │
│        language with immigrant         │
│         context prompts                │
└─────────────────────────────────────────┘
```

---

## Next Steps

1. ✅ **Install Ollama** from ollama.ai
2. ✅ **Pull a model**: `ollama pull mistral`
3. ✅ **Start Ollama**: `ollama serve`
4. ✅ **Test backend**: Follow Terminal 2 & 3 instructions
5. ✅ **Verify in browser**: Open http://localhost:5174/ and test chat
6. 📋 **Run full test suite**: See [OLLAMA_TEST.md](./OLLAMA_TEST.md)

---

## Code Files

Key files for reference:

- **Service Logic**: [OllamaService.java](src/main/java/com/newroots/backend/service/OllamaService.java)
  - Handles API calls to Ollama
  - Includes multilingual system prompts
  - Error handling with helpful messages

- **Chat Routing**: [ChatService.java](src/main/java/com/newroots/backend/service/ChatService.java)
  - Routes requests to OllamaService

- **REST Endpoint**: [ChatController.java](src/main/java/com/newroots/backend/controller/ChatController.java)
  - Endpoint: `POST /chat`
  - Accepts: `{message: string, language: string}`
  - Returns: `{reply: string}`

- **Configuration**: [application.properties](src/main/resources/application.properties)
  - Ollama URL: `http://localhost:11434`
  - Model: `mistral`
  - Server port: `8081`

---

## Production Deployment

When deploying to production:

1. **Ensure Ollama runs on production server**:
   ```bash
   ollama serve &  # background process or systemd service
   ```

2. **Secure Ollama** (don't expose to internet):
   ```bash
   # Only allow local connections
   firewall-cmd --add-port=11434/tcp --permanent
   # Or use reverse proxy that only backend can reach
   ```

3. **Monitor resources**:
   - Ollama uses significant RAM (8GB+ recommended)
   - Monitor CPU usage during inference
   - Consider load balancing if many users

4. **Scale options**:
   - Use smaller models for faster responses
   - Run multiple Ollama instances with load balancer
   - Consider GPUs for faster inference

---

## Questions?

Refer to:
- Detailed setup: [OLLAMA_SETUP.md](./OLLAMA_SETUP.md)
- Quick start: [OLLAMA_QUICKSTART.md](./OLLAMA_QUICKSTART.md)
- Full testing: [OLLAMA_TEST.md](./OLLAMA_TEST.md)
- Official Ollama: https://ollama.ai
