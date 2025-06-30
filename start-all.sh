#!/bin/bash

# Listri Full Stack Startup Script
# Starts all components: Frontend, Backend, Database, and Chat Service

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to print colored output
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

# Function to wait for a service to be ready
wait_for_service() {
    local url=$1
    local service_name=$2
    local max_attempts=30
    local attempt=1
    
    print_status "Waiting for $service_name to be ready..."
    
    while [ $attempt -le $max_attempts ]; do
        if curl -s "$url" >/dev/null 2>&1; then
            print_status "$service_name is ready!"
            return 0
        fi
        
        echo -n "."
        sleep 2
        attempt=$((attempt + 1))
    done
    
    print_error "$service_name failed to start within expected time"
    return 1
}

# Function to check if PostgreSQL is running
check_postgres() {
    if pg_isready -q; then
        print_status "PostgreSQL is running"
        return 0
    else
        print_warning "PostgreSQL is not running. Please start PostgreSQL manually."
        print_warning "On macOS: brew services start postgresql"
        print_warning "On Ubuntu: sudo systemctl start postgresql"
        return 1
    fi
}

# Function to setup database
setup_database() {
    print_status "Setting up database..."
    
    # Check if .env file exists
    if [ ! -f ".env" ]; then
        print_warning "No .env file found. Creating one with default values..."
        cat > .env << EOF
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/listri?schema=public"

# Backend
PORT=4000
JWT_SECRET=your-secret-key-here

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_CHAT_URL=http://localhost:8081
EOF
        print_warning "Please update the .env file with your actual database credentials"
    fi
    
    # Run Prisma migrations
    print_status "Running Prisma migrations..."
    npx prisma migrate deploy
    
    # Generate Prisma client
    print_status "Generating Prisma client..."
    npx prisma generate
}

# Function to cleanup on exit
cleanup() {
    print_header "Shutting down all services..."
    
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
print_header "🚀 Starting Listri Full Stack Application"

# Check ports
print_status "Checking port availability..."
check_port 3000 || exit 1  # Frontend
check_port 4000 || exit 1  # Backend
check_port 8081 || exit 1  # Chat Service

# Check PostgreSQL
print_status "Checking database..."
if ! check_postgres; then
    print_error "Please start PostgreSQL and try again"
    exit 1
fi

# Setup database
setup_database

# Install dependencies if needed
print_status "Checking dependencies..."
if [ ! -d "node_modules" ]; then
    print_status "Installing root dependencies..."
    npm install
fi

if [ ! -d "apps/frontend/node_modules" ]; then
    print_status "Installing frontend dependencies..."
    cd apps/frontend && npm install && cd ../..
fi

if [ ! -d "apps/backend/node_modules" ]; then
    print_status "Installing backend dependencies..."
    cd apps/backend && npm install && cd ../..
fi

# Start Backend
print_header "📡 Starting Backend Service"
cd apps/backend
npm run dev &
BACKEND_PID=$!
cd ../..

# Wait for backend to be ready
sleep 3
if ! wait_for_service "http://localhost:4000" "Backend"; then
    print_error "Backend failed to start"
    exit 1
fi

# Start Chat Service
print_header "💬 Starting Chat Service"
cd apps/services/chat
./gradlew bootRun &
CHAT_PID=$!
cd ../../..

# Wait for chat service to be ready
sleep 5
if ! wait_for_service "http://localhost:8081" "Chat Service"; then
    print_warning "Chat service may not be ready yet, continuing..."
fi

# Start Frontend
print_header "🌐 Starting Frontend"
cd apps/frontend
npm run dev &
FRONTEND_PID=$!
cd ../..

# Wait for frontend to be ready
sleep 5
if ! wait_for_service "http://localhost:3000" "Frontend"; then
    print_warning "Frontend may not be ready yet, continuing..."
fi

# Success message
print_header "✅ All Services Started Successfully!"

echo -e "${GREEN}🎉 Listri is now running!${NC}"
echo ""
echo -e "${CYAN}📱 Frontend:${NC}     http://localhost:3000"
echo -e "${CYAN}🔧 Backend:${NC}      http://localhost:4000"
echo -e "${CYAN}💬 Chat Service:${NC} http://localhost:8081"
echo -e "${CYAN}🗄️  Database:${NC}     PostgreSQL (localhost:5432)"
echo ""
echo -e "${CYAN}🔗 Quick Links:${NC}"
echo -e "   • Homepage: http://localhost:3000"
echo -e "   • Chat Test: http://localhost:3000/chat"
echo -e "   • API Health: http://localhost:4000"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop all services${NC}"

# Wait for background processes
wait 