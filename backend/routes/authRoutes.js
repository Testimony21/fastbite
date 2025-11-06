import express from "express";
import { signupUser, loginUser, forgotPassword, resetPassword } from "../controllers/authController.js";

const router = express.Router();

// Existing routes
router.post("/signup", signupUser);
router.post("/login", loginUser);

// New routes for password reset
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;

