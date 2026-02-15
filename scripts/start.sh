#!/usr/bin/env bash
set -euo pipefail

# Simple starter script to run frontend (Vite) and backend (Spring Boot)
# Usage: chmod +x scripts/start.sh && ./scripts/start.sh

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "Installing frontend dependencies..."
npm install

echo "Starting frontend (Vite) in background..."
npm run dev > frontend.log 2>&1 &
FRONTEND_PID=$!
sleep 1

echo "Starting backend (Spring Boot) in background..."
./mvnw spring-boot:run > backend.log 2>&1 &
BACKEND_PID=$!

echo "Frontend PID: $FRONTEND_PID"
echo "Backend PID:  $BACKEND_PID"
echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:8080"

wait
