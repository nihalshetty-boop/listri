// CRUD endpoints for the Order model
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// GET /orders - list all orders (protected, user's orders only)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user!.userId;
    const orders = await prisma.order.findMany({
      where: { userId },
      include: { user: true, listing: true },
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// GET /orders/:id - get order by id (protected, owner only)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.user!.userId;
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: { user: true, listing: true },
    });
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    if (order.userId !== userId) {
      return res.status(403).json({ error: 'You can only view your own orders' });
    }
    
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// POST /orders - create new order (protected)
router.post('/', authenticateToken, async (req, res) => {
  const { listingId, priceAtOrder, quantity, status } = req.body;
  const userId = req.user!.userId;
  
  if (!listingId || typeof priceAtOrder !== 'number') {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  try {
    // Verify the listing exists (optional for external listings)
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
    });
    
    // If listing doesn't exist in our DB, we'll still allow the order
    // but log it for tracking external listings
    if (!listing) {
      console.log(`Creating order for external listing: ${listingId}`);
    }
    
    const order = await prisma.order.create({
      data: {
        userId,
        listingId,
        priceAtOrder,
        quantity: quantity || 1,
        status: status || 'PENDING',
      },
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// PUT /orders/:id - update order (protected, owner only)
router.put('/:id', authenticateToken, async (req, res) => {
  const { status, quantity } = req.body;
  const userId = req.user!.userId;
  
  try {
    // Check if order exists and user owns it
    const existingOrder = await prisma.order.findUnique({
      where: { id: req.params.id },
    });
    
    if (!existingOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    if (existingOrder.userId !== userId) {
      return res.status(403).json({ error: 'You can only update your own orders' });
    }
    
    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: {
        ...(status && { status }),
        ...(quantity && { quantity }),
      },
    });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update order' });
  }
});

// DELETE /orders/:id - delete order (protected, owner only)
router.delete('/:id', authenticateToken, async (req, res) => {
  const userId = req.user!.userId;
  
  try {
    // Check if order exists and user owns it
    const existingOrder = await prisma.order.findUnique({
      where: { id: req.params.id },
    });
    
    if (!existingOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    if (existingOrder.userId !== userId) {
      return res.status(403).json({ error: 'You can only delete your own orders' });
    }
    
    await prisma.order.delete({ where: { id: req.params.id } });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

export default router; 