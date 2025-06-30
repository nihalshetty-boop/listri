// apps/backend/routes/listings.ts
import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

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

// POST /api/listings - create a new listing
router.post("/", async (req, res) => {
  const { title, description, price, imageUrl, category, userId } = req.body;
  try {
    const newListing = await prisma.listing.create({
      data: { title, description, price, imageUrl, category, userId },
    });
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
