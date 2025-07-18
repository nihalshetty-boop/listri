// apps/backend/routes/listings.ts
import express from "express";
import { PrismaClient } from "@prisma/client";
import fetch from 'node-fetch';

const router = express.Router();
const prisma = new PrismaClient();

const SEARCH_SERVICE_URL = process.env.SEARCH_SERVICE_URL || 'http://localhost:8082';
const SEARCH_SERVICE_SECRET = process.env.SEARCH_SERVICE_SECRET || 'changeme';

// GET /api/listings - fetch all listings
router.get("/", async (req, res) => {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(listings);
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Proxy search endpoint
router.get('/search', async (req, res) => {
  const q = req.query.q;
  if (!q) return res.status(400).json({ error: "Missing 'q' parameter" });
  try {
    const searchRes = await fetch(`${SEARCH_SERVICE_URL}/search?q=${encodeURIComponent(q as string)}`, {
      headers: { 'x-search-secret': SEARCH_SERVICE_SECRET }
    });
    const data = await searchRes.json();
    res.status(searchRes.status).json(data);
  } catch (err) {
    console.error('Error proxying search:', err);
    res.status(500).json({ error: 'Search service unavailable' });
  }
});

// Helper to index a listing in the search service
async function indexListing(listing: any) {
  try {
    await fetch(`${SEARCH_SERVICE_URL}/index`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-search-secret': SEARCH_SERVICE_SECRET
      },
      body: JSON.stringify({
        id: listing.id,
        title: listing.title,
        description: listing.description
      })
    });
  } catch (err) {
    console.error('Failed to index listing in search service:', err);
  }
}

// POST /api/listings - create a new listing
router.post("/", async (req, res) => {
  const { title, description, price, imageUrl, category, userId } = req.body;
  try {
    const newListing = await prisma.listing.create({
      data: { title, description, price, imageUrl, category, userId },
    });
    // Index in search service
    indexListing(newListing);
    res.status(201).json(newListing);
  } catch (error) {
    console.error("Error creating listing:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT /api/listings/:id - update a listing
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, price, imageUrl, category } = req.body;
  try {
    const updatedListing = await prisma.listing.update({
      where: { id },
      data: { title, description, price, imageUrl, category },
    });
    // Index in search service
    indexListing(updatedListing);
    res.json(updatedListing);
  } catch (error) {
    console.error("Error updating listing:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, price, imageUrl, category } = req.body;

  try {
    const updated = await prisma.listing.update({
      where: { id },
      data: { title, description, price, imageUrl, category },
    });
    res.json(updated);
  } catch (err) {
    console.error("Error updating listing:", err);
    res.status(500).json({ error: "Failed to update listing" });
  }
});

// DELETE /api/listings/:id - delete a listing
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await prisma.listing.delete({
      where: { id },
    });
    res.json(deleted);
  } catch (err) {
    console.error("Error deleting listing:", err);
    res.status(500).json({ error: "Failed to delete listing" });
  }
});

export default router;
