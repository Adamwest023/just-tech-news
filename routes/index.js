//collecting the packaged group of API endpoints and prefixing them with the path /api

const router = require('express').Router();

const apiRoutes = require('./api');

router.use('/api', apiRoutes);


//for any route call that we dont have an endpoint for
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;