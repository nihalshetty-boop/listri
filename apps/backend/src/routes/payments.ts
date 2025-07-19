import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

// POST /api/payments/create-checkout-session - Create Stripe checkout session
router.post('/create-checkout-session', authenticateToken, async (req, res) => {
  const { orderId } = req.body;
  const userId = req.user!.userId;

  try {
    // Verify order exists and user owns it
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { listing: true },
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (order.userId !== userId) {
      return res.status(403).json({ error: 'You can only pay for your own orders' });
    }

    if (order.status !== 'PENDING') {
      return res.status(400).json({ error: 'Order is not in pending status' });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: order.listing.title,
              description: order.listing.description,
            },
            unit_amount: Math.round(order.priceAtOrder * 100), // Convert to cents
          },
          quantity: order.quantity,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/payment/cancel`,
      metadata: {
        orderId: orderId,
        userId: userId,
      },
    });

    // Update order status to RESERVED
    await prisma.order.update({
      where: { id: orderId },
      data: { status: 'RESERVED' },
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// POST /api/payments/webhook - Handle Stripe webhooks
router.post('/webhook', async (req, res) => {
  // Skip webhook verification for now - just log the event
  console.log('Webhook received:', req.body);
  
  const event = req.body;
  
  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      await handlePaymentSuccess(session);
      break;
    case 'checkout.session.expired':
      const expiredSession = event.data.object;
      await handlePaymentExpired(expiredSession);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

// Handle successful payment
async function handlePaymentSuccess(session: Stripe.Checkout.Session) {
  const orderId = session.metadata?.orderId;
  
  if (!orderId) {
    console.error('No orderId in session metadata');
    return;
  }

  try {
    // Update order status to PAID
    await prisma.order.update({
      where: { id: orderId },
      data: { 
        status: 'PAID',
        updatedAt: new Date(),
      },
    });

    console.log(`Order ${orderId} marked as paid`);
  } catch (error) {
    console.error('Error updating order status:', error);
  }
}

// Handle expired payment
async function handlePaymentExpired(session: Stripe.Checkout.Session) {
  const orderId = session.metadata?.orderId;
  
  if (!orderId) {
    console.error('No orderId in session metadata');
    return;
  }

  try {
    // Reset order status to PENDING
    await prisma.order.update({
      where: { id: orderId },
      data: { 
        status: 'PENDING',
        updatedAt: new Date(),
      },
    });

    console.log(`Order ${orderId} reset to pending after expiration`);
  } catch (error) {
    console.error('Error resetting order status:', error);
  }
}

// GET /api/payments/order/:orderId - Get payment status for an order
router.get('/order/:orderId', authenticateToken, async (req, res) => {
  const { orderId } = req.params;
  const userId = req.user!.userId;

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { listing: true },
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (order.userId !== userId) {
      return res.status(403).json({ error: 'You can only view your own orders' });
    }

    res.json({
      orderId: order.id,
      status: order.status,
      amount: order.priceAtOrder,
      quantity: order.quantity,
      listing: order.listing,
    });
  } catch (error) {
    console.error('Error fetching order payment status:', error);
    res.status(500).json({ error: 'Failed to fetch payment status' });
  }
});

export default router; 