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
    location: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true,
    },
    image: {
      type: String, // URL of restaurant logo/banner
      default: "",
    },
    cuisine: { 
      type: String, required: true 
    },  // 👈 Add this
    rating: { 
      type: Number, default: 0 
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false, // Admin can approve restaurants
    },
  },
  { timestamps: true }
);

// const Restaurant = mongoose.models.Restaurant || mongoose.model("Restaurant", restaurantSchema);
export default mongoose.model("Restaurant", restaurantSchema);
