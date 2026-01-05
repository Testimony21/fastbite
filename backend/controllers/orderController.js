import Order from "../models/order.js";
import Cart from "../models/cart.js";

export const createFakeOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalAmount = cart.products.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: req.user._id,
      items: cart.products,
      totalAmount,
      paymentStatus: "paid",
      paymentMethod: "fake",
    });

    // clear cart after successful order
    cart.products = [];
    cart.totalItems = 0;
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Order failed" });
  }
};
