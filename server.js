const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("E-commerce Backend Running!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
