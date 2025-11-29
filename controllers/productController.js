const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");
const stream = require("stream");

exports.createProduct = async (req, res) => {
  try {
    const { name, description, rating, totalPrice, offerPrice } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        error: "At least one image is required"
      });
    }

    // Upload images to Cloudinary
    const imageUploads = req.files.map(file => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "ecommerce-products",
            public_id: `product-${Date.now()}-${Math.round(Math.random() * 1E9)}`
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          }
        );

        // Convert buffer to stream
        const bufferStream = new stream.PassThrough();
        bufferStream.end(file.buffer);
        bufferStream.pipe(uploadStream);
      });
    });

    const imageUrls = await Promise.all(imageUploads);

    const product = new Product({
      name,
      description,
      images: imageUrls,
      rating: rating || 5,
      totalPrice,
      offerPrice,
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully with images uploaded to Cloudinary!",
      product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};