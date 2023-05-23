const router = require('express').Router();
const pages = require('./pages');

// Import route modules
const apiRoutes = require('./api');

// Define routes
router.use('/api', apiRoutes); // Handles API requests under the '/api' path
router.use('/', pages);

module.exports = router;
