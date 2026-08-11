// routes/blogRoutes.js
// Defines the URLs for blog actions

const express = require("express");
const router = express.Router();
const { createBlog, getBlogs } = require("../controllers/blogController");
const protect = require("../middleware/authMiddleware");

router.post("/", protect, createBlog); // must be logged in to create a blog
router.get("/", getBlogs); // anyone can view all blogs

module.exports = router;
