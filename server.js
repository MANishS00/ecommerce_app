const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
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

app.use("/api/auth", authRoutes);

app.post("/login", async (req, res) => {
  try {
    const { mobile, password } = req.body;

    const user = await User.findOne({ mobile });

    if (!user) {
      return res.json({ success: false, message: "Mobile not found" });
    }

    if (user.password !== password) {
      return res.json({ success: false, message: "Wrong password" });
    }

    return res.json({ success: true, message: "Login successful" });

  } catch (err) {
    return res.json({ success: false, message: "Server error" });
  }
});

const cartRoutes = require("./routes/cartRoutes");
app.use("/api/cart", cartRoutes);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

