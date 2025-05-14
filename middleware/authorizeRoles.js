// Function to restrict access based on user roles


function authorizeRoles(...roles) {
    return (req, res, next) => {
      // Check if the user's role is included in the allowed roles
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Access forbidden' });
      }
      next();
    };
  }
  
  module.exports = authorizeRoles;
  