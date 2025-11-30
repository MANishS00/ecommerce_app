import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import checkoutRoutes from "./routes/checkoutRoutes.js";
import User from "./models/user.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const __dirname = path.resolve();
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/checkout", checkoutRoutes);

// Simple login
app.post("/login", async (req, res) => {
  const { mobile, password } = req.body;

  const user = await User.findOne({ mobile });
  if (!user) return res.json({ success: false, message: "Mobile not found" });

  if (user.password !== password)
    return res.json({ success: false, message: "Wrong password" });

  res.json({ success: true, message: "Login successful" });
});

// Home page route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
