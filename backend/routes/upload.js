import express from "express";
import upload from "../middleware/upload.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, upload.single("image"), (req, res) => {
  res.send({
    message: "Image uploaded successfully",
    filePath: `/${req.file.path}`,
  });
});

export default router;
