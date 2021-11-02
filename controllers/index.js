//collecting the packaged group of API endpoints and prefixing them with the path /api

const router = require('express').Router();

//connects the index file with our routes
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');

//allows router to use those routes
router.use('/api', apiRoutes);
router.use('/', homeRoutes);




//for any route call that we dont have an endpoint for
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;