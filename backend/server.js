// server.js
// This is the main entry point of the backend application

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Route files
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

// ----- Middleware -----
app.use(cors()); // allows your frontend (running on a different port) to talk to this backend
app.use(express.json()); // allows the server to read JSON data sent in requests

// ----- Connect to MongoDB -----
connectDB();

// ----- Routes -----
app.use("/api/auth", authRoutes); // -> /api/auth/register , /api/auth/login
app.use("/api/blogs", blogRoutes); // -> /api/blogs

// Simple test route to check the server is alive
app.get("/", (req, res) => {
  res.send("Blog backend is running ✅");
});

// ----- Start server -----
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
