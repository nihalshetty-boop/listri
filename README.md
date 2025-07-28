# Listri

A comprehensive marketplace platform built with modern microservices architecture, featuring real-time chat, search capabilities, and payment processing.

## Overview

Listri is a full-stack marketplace application that enables users to list items for sale, browse listings, communicate through real-time chat, and complete transactions. The platform is built using a microservices architecture with separate services for different functionalities.

### Key Features

- User authentication and authorization
- Item listing and browsing
- Real-time chat system
- Advanced search functionality
- Payment processing with Stripe
- Order management
- User profiles and dashboards
- Responsive web interface

## Architecture

The application follows a microservices architecture with the following components:

### Frontend Service
- **Technology:** Next.js 15, React 19, TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit
- **Authentication:** NextAuth.js
- **Real-time Communication:** WebSocket with STOMP
- **Payment Integration:** Stripe

### Backend API Service
- **Technology:** Node.js, Express.js, TypeScript
- **Database ORM:** Prisma
- **Authentication:** JWT with bcrypt
- **Payment Processing:** Stripe integration
- **API Documentation:** RESTful endpoints

### Chat Service
- **Technology:** Spring Boot 3.5, Java 17
- **WebSocket:** Spring WebSocket with STOMP
- **Database:** H2 (development), PostgreSQL (production)
- **Real-time Features:** Instant messaging, chat history

### Search Service
- **Technology:** Go 1.21, Gin framework
- **Search Engine:** Bleve search library
- **Features:** Full-text search, filtering, ranking

### Monitor Service
- **Technology:** Go 1.24, Prometheus
- **Monitoring:** Metrics collection, health checks
- **Observability:** Performance monitoring

### Database
- **Primary Database:** PostgreSQL
- **ORM:** Prisma
- **Models:** Users, Listings, Orders, Chat Messages

## Tech Stack

### Frontend
- Next.js 15.3.4
- React 19.0.0
- TypeScript 5
- Tailwind CSS 4
- Redux Toolkit 2.8.2
- NextAuth.js 4.24.11
- Lucide React (icons)
- Radix UI components

### Backend
- Node.js
- Express.js 4.21.2
- TypeScript 5.8.3
- Prisma 6.10.1
- JWT authentication
- bcrypt 6.0.0
- Stripe 18.3.0

### Chat Service
- Spring Boot 3.5.3
- Java 17
- Spring WebSocket
- Spring Data JPA
- H2 Database (dev)
- Gradle build system

### Search Service
- Go 1.21
- Gin framework
- Bleve search engine
- Full-text indexing

### Monitor Service
- Go 1.24.5
- Prometheus client
- Metrics collection

### Infrastructure
- PostgreSQL database
- WebSocket communication
- RESTful APIs
- Microservices architecture
- Turbo monorepo management

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **PostgreSQL** (v12 or higher)
- **Java** (v11 or higher, for Spring Boot)
- **Gradle** (for Spring Boot)
- **Go** (v1.21 or higher, for search and monitor services)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd listri
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd apps/frontend && npm install

# Install backend dependencies
cd apps/backend && npm install
```

### 3. Database Setup

Start PostgreSQL and create the database:

```bash
# macOS
brew services start postgresql

# Ubuntu/Debian
sudo systemctl start postgresql

# Create database
createdb listri
```

### 4. Environment Configuration

Create a `.env` file in the root directory:

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

### 5. Database Migration

```bash
# Run Prisma migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate
```

### 6. Start Services

The project includes convenient startup scripts:

```bash
# Make scripts executable
chmod +x *.sh

# Start all services (recommended for first time)
./start-all.sh

# Quick development start (skips database setup)
./start-dev.sh

# Start only chat and frontend
./start-chat.sh

# Stop all services
./stop-all.sh
```

### 7. Access the Application

Once all services are running, you can access:

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:4000
- **Chat Service:** http://localhost:8081
- **Chat Test Page:** http://localhost:3000/chat

## Development

### Project Structure

```
listri/
├── apps/
│   ├── frontend/          # Next.js frontend application
│   ├── backend/           # Express.js API server
│   └── services/
│       ├── chat/          # Spring Boot chat service
│       ├── search/        # Go search service
│       └── monitor/       # Go monitoring service
├── prisma/                # Database schema and migrations
├── scripts/               # Startup and utility scripts
└── package.json           # Root package configuration
```

### Available Scripts

- `npm run dev:frontend` - Start frontend in development mode
- `npm run build:frontend` - Build frontend for production
- `./start-all.sh` - Start all services with database setup
- `./start-dev.sh` - Quick start for development
- `./start-chat.sh` - Start chat and frontend only
- `./stop-all.sh` - Stop all running services

### Database Management

```bash
# View database in Prisma Studio
npx prisma studio

# Reset database
npx prisma migrate reset

# Generate new migration
npx prisma migrate dev --name <migration-name>
```

## API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/profile` - Get user profile

### Listings
- `GET /listings` - Get all listings
- `POST /listings` - Create new listing
- `GET /listings/:id` - Get specific listing
- `PUT /listings/:id` - Update listing
- `DELETE /listings/:id` - Delete listing

### Orders
- `GET /orders` - Get user orders
- `POST /orders` - Create new order
- `PUT /orders/:id` - Update order status

### Payments
- `POST /payments/create-payment-intent` - Create Stripe payment intent
- `POST /payments/confirm` - Confirm payment

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Troubleshooting

### Common Issues

**Port Already in Use:**
```bash
# Check what's using the port
lsof -i :3000

# Kill the process
kill -9 <PID>
```

**Database Connection Issues:**
- Ensure PostgreSQL is running
- Check `.env` file has correct credentials
- Verify database exists: `createdb listri`

**Dependencies Missing:**
```bash
# Install all dependencies
npm install
cd apps/frontend && npm install
cd apps/backend && npm install
```

**Spring Boot Issues:**
```bash
# Check Java version
java -version

# Build chat service
cd apps/services/chat
./gradlew clean build
```

## Future Plans

### Phase 1: Enhanced Features
- Advanced search filters and sorting
- Image upload and management
- User ratings and reviews system
- Notification system (email, push notifications)
- Mobile responsive improvements

### Phase 2: Scalability
- Docker containerization
- Kubernetes deployment
- Load balancing implementation
- Database sharding and replication
- CDN integration for static assets

### Phase 3: Advanced Features
- AI-powered recommendations
- Real-time analytics dashboard
- Advanced chat features (file sharing, voice messages)
- Multi-language support
- Advanced payment options (crypto, escrow)

### Phase 4: Enterprise Features
- Admin dashboard and user management
- Advanced reporting and analytics
- API rate limiting and security
- Multi-tenant architecture
- Advanced monitoring and alerting

### Phase 5: Mobile Application
- React Native mobile app
- Push notifications
- Offline functionality
- Native device features integration

## Support

For support and questions, please open an issue in the GitHub repository or contact the development team. 