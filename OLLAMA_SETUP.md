# Ollama Chat Backend Integration

This document explains how to set up the backend to use **Ollama** instead of OpenAI.

## What is Ollama?

Ollama is a lightweight open-source LLM (Large Language Model) server that runs locally on your machine. No API keys required, no internet calls, fully private.

## Prerequisites

1. **Download and Install Ollama**
   - Go to [ollama.ai](https://ollama.ai) 
   - Download for your OS (Windows, macOS, Linux)
   - Install and launch the application

2. **Pull a Model**
   - Open a terminal and run:
   ```bash
   ollama pull mistral
   ```
   - Or use a smaller/larger model:
   ```bash
   ollama pull neural-chat      # Smaller, faster
   ollama pull llama2           # Good quality
   ollama pull openchat         # Code-friendly
   ```

3. **Start Ollama Server**
   - Run:
   ```bash
   ollama serve
   ```
   - You should see output like:
   ```
   listening on 127.0.0.1:11434
   ```

## Backend Configuration

### Option 1: Environment Variables (Recommended)

Set these before running the backend:

```bash
export OLLAMA_BASE_URL="http://localhost:11434"
export OLLAMA_MODEL="mistral"

# Then run:
./mvnw spring-boot:run -Dspring-boot.run.arguments=--server.port=8081
```

### Option 2: Application Properties

Edit `src/main/resources/application.properties`:

```properties
ollama.base-url=http://localhost:11434
ollama.model=mistral
server.port=8081
```

Then run:
```bash
./mvnw spring-boot:run
```

## Testing

1. **Start Ollama** (in one terminal):
   ```bash
   ollama serve
   ```

2. **Start Backend** (in another terminal):
   ```bash
   cd /Users/trishnguyen/newroots
   export OLLAMA_BASE_URL="http://localhost:11434"
   ./mvnw spring-boot:run -Dspring-boot.run.arguments=--server.port=8081
   ```

3. **Test with curl**:
   ```bash
   curl -X POST http://localhost:8081/chat \
     -H "Content-Type: application/json" \
     -d '{"message":"What is health insurance?","language":"en"}'
   ```

4. **Start Frontend** (in a third terminal):
   ```bash
   cd /Users/trishnguyen/newroots
   npm run dev
   ```

   Then open: http://localhost:5174/

## Available Models

Popular models for different needs:

| Model | Size | Speed | Quality | Best For |
|-------|------|-------|---------|----------|
| `mistral` | 7B | Fast | Good | General purpose (recommended) |
| `neural-chat` | 7B | Very Fast | Good | Conversations |
| `llama2` | 7B | Fast | Very Good | General tasks |
| `openchat` | 7B | Fast | Good | Code & technical |
| `dolphin-mixtral` | 46B | Slow | Excellent | Complex reasoning (needs 16GB+ RAM) |

To use a different model:

```bash
ollama pull neural-chat
export OLLAMA_MODEL="neural-chat"
./mvnw spring-boot:run -Dspring-boot.run.arguments=--server.port=8081
```

## Troubleshooting

### Error: "Ollama connection failed"
- Check that Ollama is running: `ollama serve`
- Verify the URL is correct (default: `http://localhost:11434`)
- Check that the port is not blocked by a firewall

### Error: "Model not found"
- Pull the model:
  ```bash
  ollama pull mistral
  ```
- Verify the model name matches what you set in config

### Slow responses
- You're using a large model or a low-powered computer
- Try a smaller model like `neural-chat` or `dolphin-2.2`
- Check CPU/RAM availability with `top` or Task Manager

### Out of memory errors
- Reduce model size: use `neural-chat` instead of `llama2`
- Increase system swap/virtual memory
- Close other applications

## Development vs Production

**For Development:**
- Use Ollama locally (no API keys, free, private)
- Perfect for testing UI/UX without external API costs

**For Production:**
- You can still use Ollama on your server
- Or switch back to OpenAI by using `OpenAIService` instead

To switch back to OpenAI:
1. Edit `ChatService.java` - change from `OllamaService` to `OpenAIService`
2. Set `OPENAI_API_KEY` environment variable
3. Restart the backend

## Performance Notes

- First request may be slower (model loading)
- Subsequent requests are cached and faster
- Response time depends on:
  - Model size (7B models: ~2-5s, 13B: ~5-15s)
  - Your hardware (CPU/GPU)
  - Prompt length

## Security & Privacy

✅ **Ollama Benefits:**
- No API keys needed
- Fully offline (no data sent to external servers)
- Complete privacy
- Free to use

Perfect for handling sensitive immigrant data without external exposure!

## Further Resources

- [Ollama GitHub](https://github.com/jmorganca/ollama)
- [Model Library](https://ollama.ai/library)
- [Documentation](https://github.com/jmorganca/ollama/blob/main/README.md)
