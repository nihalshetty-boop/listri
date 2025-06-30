#!/bin/bash

# Start Chat Service and Frontend
echo "🚀 Starting Listri Chat System..."

# Function to check if a port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "❌ Port $1 is already in use"
        return 1
    else
        echo "✅ Port $1 is available"
        return 0
    fi
}

# Check ports
echo "Checking ports..."
check_port 8081 || exit 1
check_port 3000 || exit 1

# Start Spring Boot Chat Service
echo "📡 Starting Spring Boot Chat Service..."
cd apps/services/chat
./gradlew bootRun &
CHAT_PID=$!

# Wait a moment for the service to start
sleep 5

# Start Frontend
echo "🌐 Starting Next.js Frontend..."
cd ../../frontend
npm run dev &
FRONTEND_PID=$!

echo "✅ Services started!"
echo "📡 Chat Service: http://localhost:8081"
echo "🌐 Frontend: http://localhost:3000"
echo "💬 Chat Test: http://localhost:3000/chat"
echo ""
echo "Press Ctrl+C to stop all services"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping services..."
    kill $CHAT_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Services stopped"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Wait for background processes
wait 