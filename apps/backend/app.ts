// apps/backend/app.ts
import express from "express";
import cors from "cors";
import listingsRouter from "./routes/listings";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/listings", listingsRouter);

app.get("/", (req, res) => {
  res.send("Listri API is running ✅");
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
