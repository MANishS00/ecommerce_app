const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const productController = require("../controllers/productController");

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes
router.post("/create", upload.single("image"), productController.createProduct);
router.get("/all", productController.getProducts);

module.exports = router;
