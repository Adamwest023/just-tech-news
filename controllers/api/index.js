const router = require('express').Router();

//calls routes from user-routes.js
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

//lets those routes be read through express.js
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments',commentRoutes);

module.exports = router;