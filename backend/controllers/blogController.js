// controllers/blogController.js
// Contains the logic for creating and fetching blogs

const Blog = require("../models/Blog");

// @route   POST /api/blogs   (protected - user must be logged in)
const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required." });
    }

    const blog = await Blog.create({
      title,
      content,
      author: req.user.id, // comes from the JWT token (set in authMiddleware)
    });

    res.status(201).json({
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @route   GET /api/blogs   (public - anyone can view all blogs)
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name email") // show author's name/email instead of just their ID
      .sort({ createdAt: -1 }); // newest blogs first

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createBlog, getBlogs };
