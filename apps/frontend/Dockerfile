# Dockerfile for the frontend service

# 1. Builder image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# 2. Production image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy built files from the builder image
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

# Install production dependencies
RUN npm install --production

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
