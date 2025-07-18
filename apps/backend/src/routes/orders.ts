// CRUD endpoints for the Order model
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /orders - list all orders
router.get('/', async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: { user: true, listing: true },
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// GET /orders/:id - get order by id
router.get('/:id', async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: { user: true, listing: true },
    });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// POST /orders - create new order
router.post('/', async (req, res) => {
  const { userId, listingId, priceAtOrder, quantity, status } = req.body;
  if (!userId || !listingId || typeof priceAtOrder !== 'number') {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
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

// PUT /orders/:id - update order (e.g., status, quantity)
router.put('/:id', async (req, res) => {
  const { status, quantity } = req.body;
  try {
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

// DELETE /orders/:id - delete order
router.delete('/:id', async (req, res) => {
  try {
    await prisma.order.delete({ where: { id: req.params.id } });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

export default router; 