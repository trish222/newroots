#!/bin/bash

# NewRoots + Ollama Quick Start Script
# Run this in 3 separate terminals

echo "========================================"
echo "NewRoots with Ollama - Quick Start"
echo "========================================"
echo ""
echo "Choose which component to start:"
echo ""
echo "1. Ollama Server      (ollama serve)"
echo "2. Backend            (Spring Boot on 8081)"
echo "3. Frontend           (Vite on 5174)"
echo ""
echo "Usage:"
echo "  In Terminal 1: bash ./scripts/start.sh 1"
echo "  In Terminal 2: bash ./scripts/start.sh 2"
echo "  In Terminal 3: bash ./scripts/start.sh 3"
echo ""

COMPONENT=${1:-0}

if [ "$COMPONENT" = "1" ]; then
    echo "🚀 Starting Ollama Server..."
    echo "Make sure Ollama is installed from ollama.ai"
    echo ""
    echo "Checking for mistral model..."
    ollama list | grep -q mistral || {
        echo "Downloading mistral model (~4GB)..."
        ollama pull mistral
    }
    echo ""
    echo "✅ Ollama server starting at http://localhost:11434"
    echo "Keep this terminal open!"
    echo ""
    ollama serve

elif [ "$COMPONENT" = "2" ]; then
    echo "🚀 Starting Backend (Spring Boot)..."
    echo "Make sure Ollama is running in Terminal 1!"
    echo ""
    cd /Users/trishnguyen/newroots
    
    # Check if Ollama is running
    if ! curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
        echo "❌ ERROR: Ollama is not running!"
        echo "Start Ollama first: bash ./scripts/start.sh 1"
        exit 1
    fi
    
    echo "✅ Ollama is running"
    echo "🔨 Building and starting backend on port 8081..."
    echo ""
    
    ./mvnw spring-boot:run -Dspring-boot.run.arguments=--server.port=8081

elif [ "$COMPONENT" = "3" ]; then
    echo "🚀 Starting Frontend (Vite)..."
    echo "Make sure Backend is running in Terminal 2!"
    echo ""
    cd /Users/trishnguyen/newroots
    
    # Check if backend is running
    if ! curl -s http://localhost:8081/ > /dev/null 2>&1; then
        echo "⚠️  WARNING: Backend might not be running yet"
        echo "If you see connection errors, start the backend first: bash ./scripts/start.sh 2"
        echo ""
    fi
    
    echo "Starting Vite dev server..."
    npm run dev

else
    echo "❌ Invalid component number!"
    echo "Use: bash ./scripts/start.sh [1|2|3]"
    echo ""
    echo "  1 = Ollama Server"
    echo "  2 = Backend"
    echo "  3 = Frontend"
    exit 1
fi
