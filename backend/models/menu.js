// backend/models/Menu.js
import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
    items: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description: String,
        image: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Menu", menuSchema);
