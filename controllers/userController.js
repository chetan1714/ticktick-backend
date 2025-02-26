import User from "../models/user.js";
import { connectDB, closeDB } from "../config/db.js";
import { encryptPassword, generateJWTToken } from "../utils/utils.js";

export const authentication = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      success: false,
      message: "email, and password are required",
    });
  }

  try {
    await connectDB();

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({
        isVerified: false,
        message: "User not found",
      });
    }

    const encryptedPassword = encryptPassword(password);

    const isMatch = encryptedPassword === user.password;

    if (!isMatch) {
      res.status(400).json({
        isVerified: false,
        message: "Invalid credentials",
      });
    }

    const token = generateJWTToken({
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
    });

    res.status(200).json({
      isVerified: true,
      jwtToken: token,
      message: "Authenticated",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      isVerified: false,
      message: "Internal server error",
      error,
    });
  } finally {
    await closeDB();
  }
};

export const signup = async (req, res) => {
  if (!name || !email || !password) {
    res.status(400).json({
      success: false,
      message: "Name, email, and password are required",
    });
  }

  try {
    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  } finally {
    await closeDB();
  }
};

export const updatePassword = async (req, res) => {
  try {
    const db = await connectDB();
    const usersCollection = db.collection("users");

    const favourites = await usersCollection
      .find({
        user_id: userId,
      })
      .sort({ created_at: 1 })
      .toArray();

    return {
      statusCode: 200,
      favourites,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      success: false,
      message: "Internal server error",
    };
  } finally {
    await closeDB();
  }
};
