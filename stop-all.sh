#!/bin/bash

# Listri Full Stack Stop Script
# Stops all running services

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}================================${NC}"
}

print_header "🛑 Stopping Listri Services"

# Function to kill process by port
kill_by_port() {
    local port=$1
    local service_name=$2
    
    local pid=$(lsof -ti:$port)
    if [ ! -z "$pid" ]; then
        print_status "Stopping $service_name (PID: $pid)"
        kill $pid 2>/dev/null || true
        sleep 1
        
        # Force kill if still running
        if lsof -ti:$port >/dev/null 2>&1; then
            print_warning "Force killing $service_name"
            kill -9 $pid 2>/dev/null || true
        fi
    else
        print_status "$service_name is not running"
    fi
}

# Stop services by port
kill_by_port 3000 "Frontend"
kill_by_port 4000 "Backend"
kill_by_port 8081 "Chat Service"

# Kill any remaining Node.js processes (be careful with this)
print_status "Cleaning up Node.js processes..."
pkill -f "next dev" 2>/dev/null || true
pkill -f "ts-node-dev" 2>/dev/null || true

# Kill any remaining Java processes (Spring Boot)
print_status "Cleaning up Java processes..."
pkill -f "spring-boot" 2>/dev/null || true
pkill -f "gradle" 2>/dev/null || true

print_header "✅ All Services Stopped"

echo -e "${GREEN}🎉 All Listri services have been stopped!${NC}"
echo ""
echo -e "${YELLOW}Note: PostgreSQL database is still running.${NC}"
echo -e "${YELLOW}To stop PostgreSQL:${NC}"
echo -e "   • macOS: brew services stop postgresql"
echo -e "   • Ubuntu: sudo systemctl stop postgresql" 