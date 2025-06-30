# Listri Startup Scripts Guide

This guide explains how to use the startup scripts to run all components of the Listri application.

## Available Scripts

### 1. `start-all.sh` - Full Stack Startup
**Complete setup including database initialization**

```bash
./start-all.sh
```

**What it does:**
- ✅ Checks port availability (3000, 4000, 8081)
- ✅ Verifies PostgreSQL is running
- ✅ Creates `.env` file if missing
- ✅ Runs Prisma migrations
- ✅ Installs dependencies if needed
- ✅ Starts all services in order:
  1. Backend (Port 4000)
  2. Chat Service (Port 8081)
  3. Frontend (Port 3000)
- ✅ Waits for services to be ready
- ✅ Provides status updates with colored output

**Best for:** First-time setup, production-like environment

---

### 2. `start-dev.sh` - Development Startup
**Fast startup for development (skips database setup)**

```bash
./start-dev.sh
```

**What it does:**
- ✅ Checks port availability
- ✅ Quick dependency check (warns if missing)
- ✅ Starts all services immediately
- ✅ No database setup or migrations

**Best for:** Daily development, when database is already set up

---

### 3. `start-chat.sh` - Chat Only
**Starts only the chat service and frontend**

```bash
./start-chat.sh
```

**What it does:**
- ✅ Starts Chat Service (Port 8081)
- ✅ Starts Frontend (Port 3000)
- ✅ Skips backend and database

**Best for:** Testing chat functionality only

---

### 4. `stop-all.sh` - Stop All Services
**Cleanly stops all running services**

```bash
./stop-all.sh
```

**What it does:**
- ✅ Stops services by port (3000, 4000, 8081)
- ✅ Kills remaining Node.js and Java processes
- ✅ Provides cleanup status

## Prerequisites

### Required Software
1. **Node.js** (v18 or higher)
2. **PostgreSQL** (v12 or higher)
3. **Java** (v11 or higher, for Spring Boot)
4. **Gradle** (for Spring Boot)

### Database Setup
Before running `start-all.sh`, ensure PostgreSQL is running:

**macOS:**
```bash
brew services start postgresql
```

**Ubuntu/Debian:**
```bash
sudo systemctl start postgresql
```

**Windows:**
Start PostgreSQL service from Services or use pgAdmin.

## Configuration

### Environment Variables
The scripts will create a `.env` file if it doesn't exist:

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/listri?schema=public"

# Backend
PORT=4000
JWT_SECRET=your-secret-key-here

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_CHAT_URL=http://localhost:8081
```

**Important:** Update the database credentials in `.env` to match your PostgreSQL setup.

## Usage Examples

### First Time Setup
```bash
# Make scripts executable
chmod +x *.sh

# Start everything (including database setup)
./start-all.sh
```

### Daily Development
```bash
# Quick start for development
./start-dev.sh
```

### Testing Chat Only
```bash
# Start just chat and frontend
./start-chat.sh
```

### Stop Everything
```bash
# Clean shutdown
./stop-all.sh
```

## Service URLs

Once started, your services will be available at:

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:4000
- **Chat Service:** http://localhost:8081
- **Chat Test Page:** http://localhost:3000/chat

## Troubleshooting

### Port Already in Use
If you get "Port X is already in use" error:

```bash
# Check what's using the port
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use the stop script
./stop-all.sh
```

### Database Connection Issues
1. Ensure PostgreSQL is running
2. Check your `.env` file has correct credentials
3. Verify the database exists:
   ```bash
   createdb listri
   ```

### Dependencies Missing
If you see dependency warnings:

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd apps/frontend && npm install

# Install backend dependencies
cd apps/backend && npm install
```

### Spring Boot Issues
If the chat service fails to start:

```bash
# Check Java version
java -version

# Check Gradle
./apps/services/chat/gradlew --version

# Try building manually
cd apps/services/chat
./gradlew clean build
```

### Backend Infrastructure Issues
If you encounter backend startup problems:

**Prisma Client Issues:**
```bash
# Generate Prisma client
npx prisma generate

# Copy to backend if needed
cp -r node_modules/@prisma apps/backend/node_modules/
```

**Environment Variables:**
```bash
# Ensure .env file exists in backend directory
cp .env apps/backend/

# Check DATABASE_URL is set correctly
cat apps/backend/.env
```

**TypeScript Configuration:**
```bash
# Ensure all routes are in src/routes/ directory
ls apps/backend/src/routes/

# Check for import path errors
cd apps/backend && npm run dev
```

**JSON Parsing Errors:**
If you see "Unexpected token '<', "<!DOCTYPE "... is not valid JSON":
1. Check backend is running: `curl http://localhost:4000`
2. Verify Prisma client is installed: `cd apps/backend && npm list @prisma/client`
3. Ensure .env file exists in backend directory
4. Restart backend server

## Service Status

The scripts provide real-time status updates:

- 🟢 **Green:** Success/Ready
- 🟡 **Yellow:** Warning/In Progress
- 🔴 **Red:** Error/Failed

## Graceful Shutdown

All scripts support graceful shutdown with `Ctrl+C`. They will:
1. Stop all background processes
2. Clean up temporary files
3. Provide shutdown confirmation

## Restart Services

To restart a specific service:

```bash
# Stop all
./stop-all.sh

# Start all
./start-all.sh

# Or for development
./start-dev.sh
```

## Logs

Each service logs to its own output:
- **Frontend:** Check terminal where `start-*.sh` was run
- **Backend:** Check terminal where `start-*.sh` was run
- **Chat Service:** Check terminal where `start-*.sh` was run

For more detailed logs, check the individual service directories.

## Production Deployment

For production, consider:
1. Using PM2 or similar process manager
2. Setting up proper environment variables
3. Using Docker containers
4. Setting up reverse proxy (nginx)
5. Using production database

The startup scripts are designed for development and testing purposes. 