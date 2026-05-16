import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    OrderId: {
      type: mongoose.ObjectId,
      ref: "Order",
    },
    Category: {
      type: String,
      default: "Other",
      enum: [
        "Wrong item delivered",
        "Order not received",
        "Poor packaging",
        "Late delivery",
        "Item quality issue",
        "Missing items",
        "Other"
      ],
    },
    Note: {
      type: String,
    },
    Status: {
      type: String,
      default: "Pending",
      // enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"],
      enum: ["Pending", "Under-Review", "Solved"],
    },
  },
  { timestamps: true },
);

export default mongoose.model("Report", reportSchema);
