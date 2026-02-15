# Quick Start: Running NewRoots with Ollama

## Step 1: Install Ollama

1. Go to [ollama.ai](https://ollama.ai)
2. Download for your OS
3. Install and launch

## Step 2: Download a Model

Open a terminal and run:

```bash
ollama pull mistral
```

(This downloads ~4GB, takes a few minutes)

## Step 3: Start Ollama Server

In a terminal, run:

```bash
ollama serve
```

You should see:
```
listening on 127.0.0.1:11434
```

**Leave this running!**

## Step 4: Start Backend (New Terminal)

```bash
cd /Users/trishnguyen/newroots
./mvnw spring-boot:run -Dspring-boot.run.arguments=--server.port=8081
```

Wait for:
```
Started BackendApplication in X seconds
```

## Step 5: Start Frontend (New Terminal)

```bash
cd /Users/trishnguyen/newroots
npm run dev
```

You'll see:
```
➜  Local:   http://localhost:5174/
```

## Step 6: Open in Browser

Go to: **http://localhost:5174/**

Now the chatbot will use Ollama locally!

## Three Terminals Needed:

1. **Terminal 1 (Ollama)**: `ollama serve`
2. **Terminal 2 (Backend)**: `./mvnw spring-boot:run -Dspring-boot.run.arguments=--server.port=8081`
3. **Terminal 3 (Frontend)**: `npm run dev`

---

## Troubleshooting

**Q: "Ollama connection failed"**
A: Make sure `ollama serve` is running in Terminal 1

**Q: "Model not found" error**
A: Run `ollama pull mistral` (or whichever model you configured)

**Q: Very slow responses**
A: You're using a larger model. Try `ollama pull neural-chat` (faster, smaller)

**Q: Port 8081 already in use**
A: Change the port:
```bash
./mvnw spring-boot:run -Dspring-boot.run.arguments=--server.port=8082
```
Then update vite config `/chat` proxy port to `8082`

---

## Next Steps

See [OLLAMA_SETUP.md](./OLLAMA_SETUP.md) for:
- Advanced configuration
- Different model options
- Performance tuning
- Troubleshooting

Enjoy your local, private AI assistant! 🚀
