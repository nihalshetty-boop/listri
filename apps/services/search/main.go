package main

import (
	"log"
	"net/http"
	"os"

	"github.com/blevesearch/bleve/v2"
	"github.com/gin-gonic/gin"
)

var index bleve.Index

func main() {
	var err error
	// Create an in-memory Bleve index
	index, err = bleve.NewMemOnly(bleve.NewIndexMapping())
	if err != nil {
		log.Fatalf("Failed to create Bleve index: %v", err)
	}

	r := gin.Default()

	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	r.GET("/search", requireSecret(), searchHandler)
	r.POST("/index", requireSecret(), indexHandler)

	log.Println("SearchService running on :8082")
	r.Run(":8082")
}

type Document struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
}

func searchHandler(c *gin.Context) {
	q := c.Query("q")
	if q == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing query parameter 'q'"})
		return
	}

	query := bleve.NewQueryStringQuery(q)
	searchRequest := bleve.NewSearchRequest(query)
	searchResult, err := index.Search(searchRequest)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, searchResult)
}

func indexHandler(c *gin.Context) {
	var doc Document
	if err := c.ShouldBindJSON(&doc); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON: " + err.Error()})
		return
	}
	if doc.ID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing 'id' field"})
		return
	}
	if err := index.Index(doc.ID, doc); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": "indexed", "id": doc.ID})
}

func requireSecret() gin.HandlerFunc {
	return func(c *gin.Context) {
		secret := os.Getenv("SEARCH_SERVICE_SECRET")
		if secret == "" {
			secret = "changeme"
		}
		reqSecret := c.GetHeader("x-search-secret")
		if reqSecret != secret {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			return
		}
		c.Next()
	}
} 