import { Router } from "express";
import prisma from "../lib/prisma";
import { authenticateToken } from "../middleware/auth";

const router = Router();

// GET current user's profile
router.get("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user!.userId;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        firstName: true,
        lastName: true,
        avatarUrl: true,
        age: true,
        city: true,
        country: true,
        bio: true,
        profileCompleted: true,
        createdAt: true,
      },
    });

    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json(user);
  } catch (err) {
    console.error("Get profile error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Update current user's profile
router.put("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user!.userId;
    const { firstName, lastName, avatarUrl, age, city, country, bio, profileCompleted } = req.body;

    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        avatarUrl,
        age,
        city,
        country,
        bio,
        profileCompleted: Boolean(profileCompleted),
        // Keep legacy name in sync if first/last provided
        ...(firstName || lastName ? { name: `${firstName || ""} ${lastName || ""}`.trim() } : {}),
      },
      select: {
        id: true,
        email: true,
        name: true,
        firstName: true,
        lastName: true,
        avatarUrl: true,
        age: true,
        city: true,
        country: true,
        bio: true,
        profileCompleted: true,
      },
    });

    return res.json(updated);
  } catch (err) {
    console.error("Update profile error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;


