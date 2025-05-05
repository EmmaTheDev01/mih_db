const jwt = require('jsonwebtoken');

// Secret key for signing JWT (should be in your .env file)
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'yourSecretKey';

// Middleware to verify the token
const verifyToken = (req, res, next) => {
  const token = req.cookies.auth_token; // Get the token from the cookies

  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No Token Provided' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY); // Verify the token using the secret key
    req.user = decoded; // Attach the decoded user information to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(400).json({ message: 'Invalid Token' });
  }
};

// Middleware to verify if the user is the same user as in the token
const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.userId === req.params.id || req.user.role === 'admin') {
      next(); // If the user is the same or the user is an admin, proceed
    } else {
      res.status(403).json({ message: 'You are not authorized to access this resource' });
    }
  });
};

// Middleware to verify if the user is an admin
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === 'admin') {
      next(); // If the user is an admin, proceed
    } else {
      res.status(403).json({ message: 'Access Denied: Admins only' });
    }
  });
};

module.exports = { verifyUser, verifyAdmin };
