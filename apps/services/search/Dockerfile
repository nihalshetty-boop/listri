# Dockerfile for the search service

# 1. Builder image
FROM golang:1.21-alpine AS builder

# Set working directory
WORKDIR /app

# Copy the Go modules files
COPY go.mod go.sum ./

# Download the dependencies
RUN go mod download

# Copy the source code
COPY . .

# Build the application
RUN go build -o /main .

# 2. Production image
FROM scratch

# Copy the binary from the builder image
COPY --from=builder /main /main

# Expose the port
EXPOSE 8082

# Start the application
CMD ["/main"]
