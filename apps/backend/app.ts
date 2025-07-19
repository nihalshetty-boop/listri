// apps/backend/app.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Import routes
import listingsRouter from "./src/routes/listings";
import authRouter from "./src/routes/auth";
import ordersRouter from "./src/routes/orders";
import paymentsRouter from "./src/routes/payments";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Mount routes
app.use("/auth", authRouter);
app.use("/api/listings", listingsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/payments", paymentsRouter);

app.get("/", (req, res) => {
  res.send("Listri API is running ✅");
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  console.log(`Stripe configured: ${process.env.STRIPE_SECRET_KEY ? 'Yes' : 'No'}`);
});
