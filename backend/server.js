// server.js
// Main entry point of the backend application

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Route files
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

// ----- Middleware -----

// Allows frontend and backend to communicate
app.use(cors());

// Allows server to read JSON request bodies
app.use(express.json());

// ----- Connect to MongoDB -----

connectDB();

// ----- Routes -----

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

// ----- Health Check -----

app.get("/", (req, res) => {
  res.status(200).send("Blog backend is running ✅");
});

// ----- Start Server -----

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});