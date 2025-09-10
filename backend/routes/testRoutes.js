import express from "express";
import Test from "../models/test.js";

const router = express.Router();

// @route   POST /api/test
// @desc    Create a new test document
router.post("/", async (req, res) => {
  try {
    const { name, message } = req.body;

    const newTest = new Test({ name, message });
    await newTest.save();

    res.status(201).json(newTest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   GET /api/test
// @desc    Fetch all test documents
router.get("/", async (req, res) => {
  try {
    const tests = await Test.find();
    res.json(tests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
