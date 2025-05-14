const jwt = require('jsonwebtoken');

// Function to generate a JSON Web Token (JWT) for a user
function generateToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
}

module.exports = generateToken;
