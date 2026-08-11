// routes/blogRoutes.js
// Defines the URLs for blog actions

const express = require("express");
const router = express.Router();

const {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const protect = require("../middleware/authMiddleware");

// Create a blog
router.post("/", protect, createBlog);

// Get all blogs
router.get("/", getBlogs);

// Get one blog
router.get("/:id", getBlogById);

// Update a blog
router.put("/:id", protect, updateBlog);

// Delete a blog
router.delete("/:id", protect, deleteBlog);

module.exports = router;