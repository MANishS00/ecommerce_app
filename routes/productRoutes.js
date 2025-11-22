const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { createProduct } = require("../controllers/productController");

// Upload up to 4 images
router.post("/create", upload.array("images", 4), createProduct);
router.get("/all", productController.getProducts);

module.exports = router;
