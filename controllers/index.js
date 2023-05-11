const router = require('express').Router();
// must change for when the file is done, this is the basis of it at least. 

const apiRoutes = require('./api');
const userRoutes = require('./user-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');
const invenSearchRoutes = require('./inven-search-routes.js');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);
router.use('/user', userRoutes);
router.use('/inven-search', invenSearchRoutes);

module.exports = router;
