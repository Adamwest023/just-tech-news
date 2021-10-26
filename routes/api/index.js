const router = require('express').Router();

//calls routes from user-routes.js
const userRoutes = require('./user-routes.js');

router.use('/users', userRoutes);

module.exports = router;