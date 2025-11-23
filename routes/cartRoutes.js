const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const router = express.Router();

// Add item to cart
router.post("/add", async (req, res) => {
  try {
    const { productId, quantity, tempUserId } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cartItem = await Cart.findOne({ productId, tempUserId });

    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({
        productId,
        quantity: quantity || 1,
        tempUserId,
      });
    }

    res.json(cartItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get cart by tempUserId
router.get("/", async (req, res) => {
  try {
    const { tempUserId } = req.query;

    const cart = await Cart.find({ tempUserId }).populate("productId");
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update quantity

module.exports = router;


// Update quantity
router.put("/update/:id", async (req, res) => {
  try {
    const { quantity } = req.body;

    // Generate random max between 2 and 10
    const maxLimit = Math.floor(Math.random() * 9) + 2; // 2–10

    if (quantity < 1 || quantity > maxLimit) {
      return res.status(400).json({ message: `Quantity must be 1 to ${maxLimit}` });
    }

    const updated = await Cart.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true }
    ).populate("productId");

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Remove item
router.delete("/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Clear cart
router.delete("/clear/:tempUserId", async (req, res) => {
  try {
    await Cart.deleteMany({ tempUserId: req.params.tempUserId });
    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
