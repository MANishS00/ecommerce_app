const Cart = require("../models/cart");
const Product = require("../models/Product");

// Add to Cart
exports.addToCart = async (req, res) => {
  try {
    const { mobile, productId, quantity = 1 } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ mobile });

    if (!cart) {
      cart = new Cart({
        mobile,
        products: [{ productId, name: product.name, price: product.offerPrice, quantity, image: product.images[0] }]
      });
    } else {
      const index = cart.products.findIndex(p => p.productId.toString() === productId);
      if (index !== -1) {
        cart.products[index].quantity += quantity;
      } else {
        cart.products.push({ productId, name: product.name, price: product.offerPrice, quantity, image: product.images[0] });
      }
    }

    await cart.save();
    res.json(cart);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Cart
exports.getCart = async (req, res) => {
  try {
    const { mobile } = req.params;
    const cart = await Cart.findOne({ mobile });
    if (!cart) return res.json({ products: [] });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove from Cart
exports.removeFromCart = async (req, res) => {
  try {
    const { mobile, productId } = req.body;
    const cart = await Cart.findOne({ mobile });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = cart.products.filter(p => p.productId.toString() !== productId);
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Clear Cart
exports.clearCart = async (req, res) => {
  try {
    const { mobile } = req.body;
    await Cart.findOneAndDelete({ mobile });
    res.json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all carts (admin view)
exports.getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
