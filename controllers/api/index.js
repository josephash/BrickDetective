const router = require('express').Router();
const legoRoutes = require('./lego-routes');
const userRoutes = require('./user-routes');

// Define routes
router.use('/lego', legoRoutes);
router.use('/user', userRoutes);

module.exports = router;
