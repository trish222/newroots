# ⚡ QUICK START - Run NewRoots + Ollama in 2 Minutes

## All Set! 3 Terminals, That's All You Need:

### Terminal 1️⃣ - Ollama Server
```bash
ollama serve
```
**First time?** Run first: `ollama pull mistral`

### Terminal 2️⃣ - Backend
```bash
cd /Users/trishnguyen/newroots
./mvnw spring-boot:run -Dspring-boot.run.arguments=--server.port=8081
```

### Terminal 3️⃣ - Frontend
```bash
cd /Users/trishnguyen/newroots
npm run dev
```

Then **open http://localhost:5174/** and chat! 🎉

---

## Test Commands (copy & paste)

```bash
# Test English
curl -X POST http://localhost:8081/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What is health insurance?","language":"en"}'

# Test Spanish (Multilingual!)
curl -X POST http://localhost:8081/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"¿Qué es el seguro de salud?","language":"es"}'
```

---

## 🛠️ Setup Complete - What You Get

✅ **Ollama** - Private, free, local AI  
✅ **10+ Languages** - English, Spanish, French, Portuguese, German, Italian, Chinese, Vietnamese, Korean, Tagalog, Arabic  
✅ **Backend** - Chat endpoint at `POST /chat`  
✅ **Frontend** - React chat interface with language detection  
✅ **Privacy** - All data stays local, no API keys  

---

## Need Help?

| Problem | Fix |
|---------|-----|
| "Ollama connection failed" | Run `ollama serve` in Terminal 1 |
| "Model not found" | Run `ollama pull mistral` |
| "Very slow" | Run `ollama pull neural-chat` instead |
| "Port in use" | Use `--server.port=8082` instead |

---

## 📚 Full Docs

- [OLLAMA_SETUP.md](./OLLAMA_SETUP.md) - Detailed setup
- [OLLAMA_TEST.md](./OLLAMA_TEST.md) - Complete testing guide
- [OLLAMA_QUICKSTART.md](./OLLAMA_QUICKSTART.md) - Another quick start

---

## Code Modified for Multilingual Support

✅ [OllamaService.java](src/main/java/com/newroots/backend/service/OllamaService.java)  
- 10 languages with native system prompts  
- Immigrant-focused guidance  
- Fallback handling for Ollama offline  

**Ready?** Start those 3 terminals! 🚀
