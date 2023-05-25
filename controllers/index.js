// Import dependencies
const express = require('express');
const router = express.Router();

// Import route modules
const apiRoutes = require('./api');
// const homeRoutes = require('./home-routes.js');
// const dashboardRoutes = require('./dashboard-routes.js');
const pagesRoutes = require('./pages.js');

// Set up routes
router.use('/api', apiRoutes);
// router.use('/', homeRoutes);
router.use('/dashboard', pagesRoutes);

// Fallback route handler
router.use((req, res) => {
  res.status(404).end();
});

// Export the router
module.exports = router;
