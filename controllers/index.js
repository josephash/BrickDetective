const router = require('express').Router();

// Import route modules
const apiRoutes = require('./api');
const userRoutes = require('./user-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');
const invenSearchRoutes = require('./inven-search-routes.js');

// Define routes
router.use('/', homeRoutes); // Handles requests to the root path
router.use('/dashboard', dashboardRoutes); // Handles requests to the '/dashboard' path
router.use('/api', apiRoutes); // Handles API requests under the '/api' path
router.use('/api', apiRoutes); // Handles API requests under the '/api' path (duplicated)
// Note: The duplicated '/api' route may be a mistake or intentional, please verify its usage

module.exports = router;
