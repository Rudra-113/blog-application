// server.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

// ----- CORS -----

const allowedOrigins = [
  "http://localhost:8000",
  "https://simpleblog-frontend.onrender.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without an origin
      // such as curl or server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
  })
);

// ----- Middleware -----

app.use(express.json());

// ----- Database -----

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