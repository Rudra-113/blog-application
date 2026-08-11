// config/db.js
// This file handles connecting to MongoDB using Mongoose

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    // Stop the app if the database connection fails
    process.exit(1);
  }
};

module.exports = connectDB;
