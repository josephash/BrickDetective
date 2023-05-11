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
router.use('/user', userRoutes); // Handles requests to the '/user' path
router.use('/inven-search', invenSearchRoutes); // Handles requests to the '/inven-search' path

module.exports = router;
