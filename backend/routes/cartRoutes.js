import express from "express";
import Cart from "../models/cart.js";
import MenuItem from "../models/menuModel.js"; // ✅ Correct import name
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Add menu item to cart
router.post("/", protect, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    console.log("🛒 Adding menu item:", productId, "quantity:", quantity);

    // Check if menu item exists
    const menuItem = await MenuItem.findById(productId);
    if (!menuItem) return res.status(404).json({ message: "Menu item not found" });

    // Find or create cart
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        products: [{ product: productId, quantity }],
      });
    } else {
      // Check if item already in cart
      const existingItem = cart.products.find(
        (item) => item.product.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }
    }

    await cart.save();

    // Count total items
    const totalItems = cart.products.reduce((sum, p) => sum + p.quantity, 0);

    res.json({
      message: "Item added to cart",
      totalItems,
    });
  } catch (err) {
    console.error("❌ Error adding to cart:", err);
    res.status(500).json({ message: "Error adding to cart", error: err.message });
  }
});

// ✅ Get user cart
router.get("/", protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "products.product",
      "name price image"
    ); // ✅ populate from MenuItem fields

    if (!cart) return res.json({ items: [], totalItems: 0 });

    const validProducts = cart.products.filter((p) => p.product !== null);

    // Auto-clean invalid products
    if (validProducts.length !== cart.products.length) {
      cart.products = validProducts;
      await cart.save();
    }

    const items = validProducts.map((p) => ({
      _id: p._id,
      productId: p.product._id,
      name: p.product.name,
      price: p.product.price,
      image: p.product.image,
      quantity: p.quantity,
    }));

    const totalItems = validProducts.reduce((sum, p) => sum + p.quantity, 0);

    res.json({ items, totalItems });
  } catch (err) {
    console.error("❌ Error fetching cart:", err);
    res.status(500).json({ message: "Error fetching cart", error: err.message });
  }
});

// ✅ Remove item from cart
router.delete("/:productId", protect, async (req, res) => {
  try {
    const { productId } = req.params;

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Filter out the product being removed
    const initialCount = cart.products.length;
    cart.products = cart.products.filter(
      (item) => item.product.toString() !== productId
    );

    if (cart.products.length === initialCount) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    await cart.save();

    const totalItems = cart.products.reduce((sum, p) => sum + p.quantity, 0);

    res.json({
      message: "Item removed from cart",
      totalItems,
    });
  } catch (err) {
    console.error("❌ Error removing item from cart:", err);
    res.status(500).json({ message: "Error removing item", error: err.message });
  }
});

export default router;
