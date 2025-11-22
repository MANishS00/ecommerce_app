const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [String],  
    validate: (v) => v.length >= 1 && v.length <= 4, 
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  offerPrice: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Product", ProductSchema);

