<<<<<<< HEAD
// Import dependencies
const express = require('express');
const router = express.Router();
=======
const router = require('express').Router();
const pages = require('./pages');
>>>>>>> 381ed78c7fdcda8f9f0e0e1f74ea33ccc7e69404

// Import route modules
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

<<<<<<< HEAD
// Set up routes
router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
=======
// Define routes
router.use('/api', apiRoutes); // Handles API requests under the '/api' path
router.use('/', pages);
>>>>>>> 381ed78c7fdcda8f9f0e0e1f74ea33ccc7e69404

// Fallback route handler
router.use((req, res) => {
  res.status(404).end();
});

// Export the router
module.exports = router;
