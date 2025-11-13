// backend/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/upload.js";
import cartRoutes from "./routes/cartRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

console.log("🔑 Brevo Key Loaded?", !!process.env.BREVO_API_KEY);

// ✅ Connect Database
console.log("🧩 Connecting to:", process.env.MONGODB_URI);
connectDB(process.env.MONGODB_URI);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Allow only your frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://fastbiteapp.netlify.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Test base route
app.get("/", (req, res) => {
  res.send("🚀 FastBite API is running...");
});

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/users", userRoutes);
app.use("/api/menus", menuRoutes);

// ✅ Error Middleware
app.use(notFound);
app.use(errorHandler);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
