const User = require("../models/user");

// SIGNUP
exports.signup = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    // check existing user
    const userExists = await User.findOne({ mobile });
    if (userExists) {
      return res.status(400).json({ message: "Mobile already registered" });
    }

    const newUser = await User.create({ mobile, password });

    res.json({
      message: "Signup successful",
      user: newUser
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    const user = await User.findOne({ mobile });

    if (!user) {
      return res.status(400).json({ message: "Mobile number not registered" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    res.json({
      message: "Login successful",
      user
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// FORGET PASSWORD
exports.forgetPassword = async (req, res) => {
  try {
    const { mobile } = req.body;

    const user = await User.findOne({ mobile });

    if (!user) {
      return res.status(400).json({ message: "Mobile not found" });
    }

    res.json({
      message: "Password found",
      password: user.password
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
