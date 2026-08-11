// middleware/authMiddleware.js
// This function checks if the request has a valid JWT token
// before letting it access a protected route (like "Create Blog")

const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  // Frontend must send the token like this in the request header:
  // Authorization: Bearer <token>
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided. Please log in." });
  }

  const token = authHeader.split(" ")[1]; // get the token part after "Bearer "

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info (id) to the request object
    next(); // token is valid, continue to the actual route
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = protect;
