const router = require('express').Router();
// must change for when the file is done, this is the basis of it at least. 
const apiRoutes = require('./api');
// const homeRoutes = require('./home-routes.js');
// const dashboardRoutes = require('./dashboard-routes.js');
// const movieSearchRoutes = require('./movie-search-routes.js');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);
// router.use('/movie-search', movieSearchRoutes);

module.exports = router;