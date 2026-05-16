import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: {},
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
     totalOrder: {
      type: Number,
      default: 0,
    },
    totalSuccessOrder: {
      type: Number,
      default: 0,
    },
     totalSpent: {
      type: Number,
      default: 0,
    },
     avgRating: {
      type: Number,
      default: 0,
    },
    totalNumOfGivenRating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);