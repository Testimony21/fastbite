// backend/controllers/authController.js
import crypto from "crypto";
import asyncHandler from "express-async-handler";
import nodemailer from "nodemailer";
import User from "../models/user.js";
import generateToken from "../utils/generateToken.js";

// Signup user
export const signupUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password, role: role || "user" });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Login user
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

// Forgot Password
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "No account found with this email" });
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(20).toString("hex");
  user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 min expiry
  await user.save();

  // Reset URL
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  // Email content
  const message = `
    <h2>Password Reset Request</h2>
    <p>Hello ${user.name},</p>
    <p>Click the link below to reset your password. This link is valid for 10 minutes:</p>
    <a href="${resetUrl}" target="_blank">${resetUrl}</a>
    <p>If you didn’t request this, please ignore this email.</p>
  `;

  // SMTP Transporter (Brevo)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"FastBite Support" <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: "FastBite Password Reset",
      html: message,
    });

    res.status(200).json({ message: "Reset email sent successfully" });
  } catch (err) {
    console.error(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    res.status(500).json({ message: "Email could not be sent" });
  }
});

// Reset Password
export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.status(200).json({ message: "Password reset successful" });
});
