const jwt = require('jsonwebtoken');

// Middleware function to authenticate users via JWT
function authenticateToken(req, res, next) {
  // Extract the token from the Authorization header
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { _id: verified.id, role: verified.role };
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = authenticateToken;

