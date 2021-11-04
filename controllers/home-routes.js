//calls router
const router = require('express').Router();

//call sequelize
const sequelize = require('../config/connection');

//call models 
const { Post, User, Comment, Vote, } = require('../models')

//route for homepage using .render() don't delete for note purposes
// router.get('/', (req,res) => {
//     //can use .render now that we are using a template engine
//     //this specifies which template we want to use 
//     //i.e. homepage.handlebars(.handlebars is implied) template
//     res.render('homepage', { 
//         //.render() can accept a second argument, an object which 
//         //includes all the data you want to pass to your template 
//         id: 1,
//         post_url: 'https://handlebarsjs.com/guide/',
//         title: 'Handlebars Docs',
//         created_at: new Date(),
//         vote_count: 10,
//         comments: [{},{}],
//         user: {
//             username: 'test_user'
//         }
//     });
// });

//homepage route
router.get('/', (req, res) => {
    console.log(req.session);
    //using a sequelize query to return all post to populate out homepage template
    //using the Post Model
    Post.findAll({
        //finding with certain attributes 
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        //joins the Comment Model at username and model User at username
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            //get the entire array of posts 
            //to serialize the object down to only the properties you need use .get()
            const posts = dbPostData.map(post => post.get({ plain: true }));
            //pass a single post object into the homepage template
            res.render('homepage', {
                posts,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.get('/post/:id', (req, res) => {
    Post.findOne({

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
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
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

            // serialize the data
            const post = dbPostData.get({ plain: true });

            // pass data to template
            res.render('single-post', {
                post,
                //requires the user to be logged in 
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//route for login template
router.get('/login', (req, res) => {
    //if you are logged in go home 
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;