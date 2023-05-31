const router = require('express').Router();

// Import route modules
const apiRoutes = require('./api');
const pagesRoutes = require('./pages');

// Set up routes
router.use('/api', apiRoutes);
router.use('/', pagesRoutes);

// Fallback route handler
router.use((req, res) => {
	res.status(404).end();
});

module.exports = router;