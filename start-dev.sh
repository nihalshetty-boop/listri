#!/bin/bash

# Listri Development Startup Script
# Starts all components without database setup (for faster development)

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}================================${NC}"
}

# Function to check if a port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        print_error "Port $1 is already in use"
        return 1
    else
        print_status "Port $1 is available"
        return 0
    fi
}

# Function to cleanup on exit
cleanup() {
    print_header "Shutting down development services..."
    
    # Kill all background processes
    if [ ! -z "$FRONTEND_PID" ]; then
        print_status "Stopping Frontend (PID: $FRONTEND_PID)"
        kill $FRONTEND_PID 2>/dev/null || true
    fi
    
    if [ ! -z "$BACKEND_PID" ]; then
        print_status "Stopping Backend (PID: $BACKEND_PID)"
        kill $BACKEND_PID 2>/dev/null || true
    fi
    
    if [ ! -z "$CHAT_PID" ]; then
        print_status "Stopping Chat Service (PID: $CHAT_PID)"
        kill $CHAT_PID 2>/dev/null || true
    fi
    
    print_status "All services stopped"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Main startup sequence
print_header "🚀 Starting Listri Development Environment"

# Check ports
print_status "Checking port availability..."
check_port 3000 || exit 1  # Frontend
check_port 4000 || exit 1  # Backend
check_port 8081 || exit 1  # Chat Service

# Quick dependency check
print_status "Checking dependencies..."
if [ ! -d "node_modules" ]; then
    print_warning "Root dependencies not found. Run 'npm install' first."
fi

if [ ! -d "apps/frontend/node_modules" ]; then
    print_warning "Frontend dependencies not found. Run 'cd apps/frontend && npm install' first."
fi

if [ ! -d "apps/backend/node_modules" ]; then
    print_warning "Backend dependencies not found. Run 'cd apps/backend && npm install' first."
fi

# Start Backend
print_header "📡 Starting Backend Service"
cd apps/backend
npm run dev &
BACKEND_PID=$!
cd ../..

# Start Chat Service
print_header "💬 Starting Chat Service"
cd apps/services/chat
./gradlew bootRun &
CHAT_PID=$!
cd ../../..

# Start Frontend
print_header "🌐 Starting Frontend"
cd apps/frontend
npm run dev &
FRONTEND_PID=$!
cd ../..

# Success message
print_header "✅ Development Services Started!"

echo -e "${GREEN}🎉 Listri development environment is ready!${NC}"
echo ""
echo -e "${CYAN}📱 Frontend:${NC}     http://localhost:3000"
echo -e "${CYAN}🔧 Backend:${NC}      http://localhost:4000"
echo -e "${CYAN}💬 Chat Service:${NC} http://localhost:8081"
echo ""
echo -e "${CYAN}🔗 Quick Links:${NC}"
echo -e "   • Homepage: http://localhost:3000"
echo -e "   • Chat Test: http://localhost:3000/chat"
echo -e "   • API Health: http://localhost:4000"
echo ""
echo -e "${YELLOW}Note: This is development mode - no database setup performed${NC}"
echo -e "${YELLOW}Press Ctrl+C to stop all services${NC}"

# Wait for background processes
wait 