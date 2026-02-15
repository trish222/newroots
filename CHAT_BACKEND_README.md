# Backend Chat Integration

This document explains how to enable real OpenAI responses for the backend `/chat` endpoint.

Environment variables

- `OPENAI_API_KEY` (required to call OpenAI) — set to your secret API key.
- `OPENAI_MODEL` (optional) — default: `gpt-3.5-turbo`.
- `OPENAI_SYSTEM_PROMPT` (optional) — default system prompt used to guide the assistant.

Example (macOS / zsh):

```bash
export OPENAI_API_KEY="sk-..."
export OPENAI_MODEL="gpt-4o-mini"
export OPENAI_SYSTEM_PROMPT="You are a helpful assistant that provides concise, actionable guidance."

# build
./mvnw -DskipTests package

# run on port 8081
./mvnw spring-boot:run -Dspring-boot.run.arguments=--server.port=8081
```

Testing

Use `curl` to test:

```bash
curl -X POST http://localhost:8081/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello","language":"en"}'
```

If `OPENAI_API_KEY` is not set, the service falls back to a simulated reply.

Frontend

The frontend `vite.config.ts` proxies `/chat` to `http://localhost:8081`, so the UI can call `/chat` directly when running the dev server.
