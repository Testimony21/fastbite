import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import Product from "../models/product.js";

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// Add a new product (admin only)
router.post("/", protect, adminOnly, async (req, res) => {
  const { name, price, description } = req.body;
  const product = new Product({ name, price, description });

  try {
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (err) {
    res.status(400).json({ message: "Error creating product", error: err.message });
  }
});

export default router;
