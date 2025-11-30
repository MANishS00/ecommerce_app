// models/Checkout.js
import mongoose from "mongoose";

const checkoutSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },

    mobile: { type: String, required: true, unique: true },
    altMobile: { type: String },

    address1: { type: String, required: true },
    address2: { type: String },

    street: { type: String, required: true },
    landmark: { type: String },

    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Checkout", checkoutSchema);
