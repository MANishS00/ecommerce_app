const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  try {
    const image = req.file ? req.file.path : null;

    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }

    const { name } = req.body;

    const product = new Product({
      name,
      image
    });

    await product.save();

    res.json({ message: "Product created", product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
