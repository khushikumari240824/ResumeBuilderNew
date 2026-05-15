import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Resume from "../models/Resume.js";

const generateToken = (userId) => {
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return token;
};

// POST: /api/users/register
export const registerUser = async (req, res) => {
  try {
    console.log("REGISTER API HIT");

    const { name, email, password } = req.body;
    console.log("Request body:", req.body);

    if (!name || !email || !password) {
      console.log("Missing required fields");

      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const user = await User.findOne({ email });
    console.log("Existing user:", user);

    if (user) {
      console.log("User already exists");

      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed");

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log("Saved user:", newUser);

    const token = generateToken(newUser._id);
    console.log("Token generated");

    newUser.password = undefined;

    return res.status(201).json({
      message: "User created successfully",
      token,
      user: newUser,
    });
  } catch (error) {
    console.log("REGISTER ERROR:", error);

    return res.status(400).json({
      message: error.message,
    });
  }
};

// POST: /api/users/login
export const loginUser = async (req, res) => {
  try {
    console.log("LOGIN API HIT");

    const { email, password } = req.body;
    console.log("Login request:", email);

    const user = await User.findOne({ email });
    console.log("Found user:", user);

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = user.comparePassword(password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user._id);

    user.password = undefined;

    return res.status(200).json({
      message: "Login successfully",
      token,
      user,
    });
  } catch (error) {
    console.log("LOGIN ERROR:", error);

    return res.status(400).json({
      message: error.message,
    });
  }
};

// GET: /api/users/data
export const getUserById = async (req, res) => {
  try {
    console.log("GET USER API HIT");

    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.password = undefined;

    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.log("GET USER ERROR:", error);

    return res.status(400).json({
      message: error.message,
    });
  }
};

// GET: /api/users/resumes
export const getUserResumes = async (req, res) => {
  try {
    console.log("GET RESUMES API HIT");

    const userId = req.userId;

    const resumes = await Resume.find({ userId });

    return res.status(200).json({
      resumes,
    });
  } catch (error) {
    console.log("GET RESUMES ERROR:", error);

    return res.status(400).json({
      message: error.message,
    });
  }
};