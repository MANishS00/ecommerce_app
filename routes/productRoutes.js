const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

// Import all controller functions
const { createProduct, getProducts } = require("../controllers/productController");

// Upload up to 4 images
router.post("/create", upload.array("images", 4), createProduct);

// Fetch all products
router.get("/all", getProducts);

module.exports = router;