//calling router 
const router = require('express').Router();

const sequelize = require('../../config/connection');
//calling our  Post and our User Model 
const { Post, User, Vote } = require('../../models');


//get all users route
router.get('/', (req, res) => {
    Post.findAll({
        //query configuration 
        //finding with certain attributes 
        attributes: ['id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        //adds an order to how posts are viewed
        order: [['created_at', 'DESC']],
        //include the JOIN to the User table
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        //create promise
        .then(dbPostData => res.json(dbPostData))
        //add a catch for errors
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// route for single entry
router.get('/:id', (req, res) => {
    Post.findOne({
        //uses a where requirment for finding one individual id 
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//route for a post creation
router.post('/', (req, res) => {
    // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
    Post.create({
        title: req.body.title,
        post_url: req.body.post_url,
        user_id: req.body.user_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//route for voting on a post
//Put /api/post/upvote
router.put('/upvote', (req, res) => {
    // custom static method created in models/Post.js
    Post.upvote(req.body, {Vote})
        .then(updatedPostData => res.json(updatedPostData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

//route to update a post 
router.put('/:id', (req, res) => {
    Post.update(
        //use the title value to replace the title fof a post
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(400).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;