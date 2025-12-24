import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    name: { type: String, required: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true },
    image: {
      type: String,
      required: true,
      default: "https://via.placeholder.com/300",
    },
  },
  { timestamps: true }
);

// ✅ Prevent duplicate menu items for the same restaurant
menuItemSchema.index({ name: 1, restaurant: 1 }, { unique: true });

const MenuItem = mongoose.model("MenuItem", menuItemSchema, "menuitems");

export default MenuItem;
