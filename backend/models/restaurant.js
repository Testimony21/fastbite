import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    image: {
      type: String, // URL of restaurant logo/banner
      default: "",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "restaurant", "admin"],
      default: "user",
    },
    isApproved: {
      type: Boolean,
      default: false, // Admin can approve restaurants
    },
  },
  { timestamps: true }
);

const Restaurant = mongoose.models.Restaurant || mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;
