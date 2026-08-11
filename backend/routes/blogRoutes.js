// routes/blogRoutes.js
// Defines the URLs for blog actions

const express = require("express");
const router = express.Router();

const {
  createBlog,
  getBlogs,
  getBlogById,
} = require("../controllers/blogController");

const protect = require("../middleware/authMiddleware");

router.post("/", protect, createBlog);
router.get("/", getBlogs);
router.get("/:id", getBlogById);

module.exports = router;
