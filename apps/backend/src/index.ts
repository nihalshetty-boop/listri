import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

// Load environment variables from the correct path
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import authRoutes from "./routes/auth";
import listingsRoutes from "./routes/listings";
import ordersRoutes from "./routes/orders";
import paymentsRoutes from "./routes/payments";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api/listings", listingsRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/payments", paymentsRoutes);

app.get("/", (_req, res) => {
  res.send("Listri Backend is running!");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
  console.log(`Stripe configured: ${process.env.STRIPE_SECRET_KEY ? 'Yes' : 'No'}`);
});
