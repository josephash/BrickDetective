const router = require('express').Router();

// Import route modules
const apiRoutes = require('./api');

// Define routes
router.use('/api', apiRoutes); // Handles API requests under the '/api' path

module.exports = router;
