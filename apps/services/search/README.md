# SearchService

A lightweight full-text search API for Listri, using Bleve and Go.

## Features
- Fast in-memory full-text search (titles, descriptions)
- REST API for search
- Health check endpoint

## Endpoints
- `GET /search?q=...` — Search indexed documents
- `GET /health` — Health check
- `POST /index` — Add or update a document in the index. Body: `{ "id": string, "title": string, "description": string }`

## Security

The `/search` and `/index` endpoints require a shared secret in the `x-search-secret` header. Set the secret in the environment variable `SEARCH_SERVICE_SECRET` (default: `changeme`).

Example (run service with secret):
```
export SEARCH_SERVICE_SECRET=yourstrongsecret
export PORT=8082
cd apps/services/search
GO111MODULE=on go run main.go
```

All requests to `/search` and `/index` must include:
```
x-search-secret: yourstrongsecret
```

## Running

```
cd apps/services/search
# Install dependencies
export GO111MODULE=on
go mod tidy
# Run the service
go run main.go
```

## Indexing Documents
Currently, documents must be indexed programmatically (see `main.go`). Future versions will support REST/event-based updates. 