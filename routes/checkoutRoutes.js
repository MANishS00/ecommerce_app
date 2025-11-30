// routes/checkoutRoutes.js
import express from "express";
import Checkout from "../models/Checkout.js";

const router = express.Router();

// Create / Update Checkout Info
router.post("/save", async (req, res) => {
  try {
    const data = req.body;

    // Check if already exists by mobile
    const existing = await Checkout.findOne({ mobile: data.mobile });

    if (existing) {
      // Update existing
      const updated = await Checkout.findOneAndUpdate(
        { mobile: data.mobile },
        data,
        { new: true }
      );
      return res.json({ message: "Updated Successfully", updated });
    }

    // Create new
    const saved = await Checkout.create(data);
    res.json({ message: "Created Successfully", saved });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Fetch all addresses
router.get("/all", async (req, res) => {
  try {
    const data = await Checkout.find().sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// Fetch one by mobile
router.get("/:mobile", async (req, res) => {
  const user = await Checkout.findOne({ mobile: req.params.mobile });
  res.json(user);
});

export default router;
