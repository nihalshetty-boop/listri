# Dockerfile for the chat service

# 1. Builder image
FROM gradle:8.5.0-jdk17-alpine AS builder

# Set working directory
WORKDIR /app

# Copy the build files
COPY build.gradle settings.gradle ./
COPY gradle ./gradle

# Copy the application source
COPY src ./src

# Build the application
RUN gradle build --no-daemon

# 2. Production image
FROM openjdk:17-jre-slim

# Set working directory
WORKDIR /app

# Copy the JAR file from the builder image
COPY --from=builder /app/build/libs/*.jar app.jar

# Expose the port
EXPOSE 8081

# Start the application
CMD ["java", "-jar", "app.jar"]
