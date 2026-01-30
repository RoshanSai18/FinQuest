module.exports = {
  // Use this to protect routes (Dashboard, Profile, etc.)
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      // If it's an API call, return 401 (Unauthorized)
      // If it's a browser request, you might want to redirect
      res.status(401).json({ message: 'Not authorized, please log in' });
    }
  },

  // Use this for the Login/Register page (if they are already logged in, kick them to Dashboard)
  ensureGuest: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('http://localhost:3000/dashboard');
    }
  }
};