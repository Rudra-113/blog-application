// controllers/blogController.js
// Contains the logic for creating, fetching, updating and deleting blogs

const Blog = require("../models/Blog");

// @route   POST /api/blogs
// @desc    Create a new blog
// @access  Protected
const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required.",
      });
    }

    const blog = await Blog.create({
      title,
      content,
      author: req.user.id,
    });

    res.status(201).json({
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// @route   GET /api/blogs
// @desc    Get all blogs
// @access  Public
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// @route   GET /api/blogs/my
// @desc    Get only the logged-in user's blogs
// @access  Protected
const getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({
      author: req.user.id,
    })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// @route   GET /api/blogs/:id
// @desc    Get one blog
// @access  Public
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("author", "name email");

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// @route   PUT /api/blogs/:id
// @desc    Update a blog
// @access  Protected
const updateBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    if (String(blog.author) !== String(req.user.id)) {
      return res.status(403).json({
        message: "You can only update your own blogs.",
      });
    }

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required.",
      });
    }

    blog.title = title;
    blog.content = content;

    await blog.save();

    res.status(200).json({
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// @route   DELETE /api/blogs/:id
// @desc    Delete a blog
// @access  Protected
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    if (String(blog.author) !== String(req.user.id)) {
      return res.status(403).json({
        message: "You can only delete your own blogs.",
      });
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


module.exports = {
  createBlog,
  getBlogs,
  getMyBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};