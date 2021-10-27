const router = require('express').Router();

//calls routes from user-routes.js
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');

//lets those routes be read through express.js
router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;