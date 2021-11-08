//collecting the packaged group of API endpoints and prefixing them with the path /api

const router = require('express').Router();

//connects the index file with our routes
const apiRoutes = require('./api/');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes');

//allows router to use those routes at the set address
router.use('/api/', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes)

//for any route call that we dont have an endpoint for
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;