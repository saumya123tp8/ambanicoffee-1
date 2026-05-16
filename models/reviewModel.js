import mongoose from "mongoose";

const reviewModel = new mongoose.Schema(
  {
    productId: {
      type: mongoose.ObjectId,
      ref: "Products",
      required: true,
    },
    userId: {
      type: mongoose.ObjectId,
      ref: "users",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewModel);