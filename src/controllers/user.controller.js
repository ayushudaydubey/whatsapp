const userModel = require("../models/auth.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.userRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new userModel({ username, email, password: hashPassword });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SEC, {
      expiresIn: "1d",
    });

    res.status(201).cookie("token", token).json({
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const existUser = await userModel.findOne({ email });
    if (!existUser) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, existUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: existUser._id }, process.env.JWT_SEC, {
      expiresIn: "1d",
    });

    res.status(200).cookie("token", token).json({
      message: "User logged in successfully",
      user: existUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
