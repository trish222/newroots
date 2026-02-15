#!/bin/bash
# Quick fix script - Run this to diagnose and show next steps

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║         OLLAMA + NEWROOTS QUICK FIX CHECKER                  ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

# Check Ollama
echo "Checking Ollama..."
if pgrep -f "ollama serve" > /dev/null; then
    echo "✅ Ollama is running"
else
    echo "❌ Ollama NOT running"
    echo "   → Fix: Run 'ollama serve' in a terminal"
fi

# Check Backend
echo ""
echo "Checking Backend on port 8081..."
if lsof -i :8081 >/dev/null 2>&1; then
    echo "✅ Backend is running"
else
    echo "❌ Backend NOT running"
    echo "   → Fix: Run './mvnw spring-boot:run -Dspring-boot.run.arguments=--server.port=8081'"
fi

# Check Frontend
echo ""
echo "Checking Frontend on port 5174..."
if lsof -i :5174 >/dev/null 2>&1; then
    echo "✅ Frontend is running"
else
    echo "❌ Frontend NOT running"
    echo "   → Fix: Run 'npm run dev'"
fi

echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                      NEXT STEPS                              ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""
echo "1. Make sure ALL 3 are running (see results above)"
echo ""
echo "2. Open http://localhost:5174/ in your browser"
echo ""
echo "3. Type a message and send"
echo ""
echo "4. If still getting '...', press F12 in browser and:"
echo "   - Look at Console tab for error messages"
echo "   - Look at Network tab for /chat request response"
echo ""
echo "5. Read troubleshooting guide:"
echo "   FIX_CHAT_DOTS.md"
echo ""
