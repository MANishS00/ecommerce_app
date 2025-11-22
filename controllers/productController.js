
const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  try {
    const { name, description, rating, totalPrice, offerPrice } = req.body;

    const images = req.files.map((file) => `/uploads/${file.filename}`);

    const product = new Product({
      name,
      description,
      images,
      rating,
      totalPrice,
      offerPrice,
    });

    await product.save();

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

