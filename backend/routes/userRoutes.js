import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { updateRole } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);       // POST /api/users
router.post("/login", loginUser); 
router.put("/:id/role", protect, adminOnly, updateRole);     // POST /api/users/login

export default router;
