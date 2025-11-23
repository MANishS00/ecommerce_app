const express = require("express");
const Cart = require("../models/cart");
const Product = require("../models/Product");

const router = express.Router();

// Add item to cart
router.post("/add", async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Check if already in cart
    let cartItem = await Cart.findOne({ productId });

    if (cartItem) {
      cartItem.quantity += quantity || 1;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({
        productId,
        quantity: quantity || 1,
      });
    }

    res.json({ message: "Added to cart", cartItem });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all cart items
router.get("/", async (req, res) => {
  try {
    const cart = await Cart.find().populate("productId");
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove a cart item
router.delete("/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Clear cart
router.delete("/", async (req, res) => {
  try {
    await Cart.deleteMany({});
    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
