//calls router
const router = require('express').Router();

//call sequelize
const sequelize = require('sequelize');

//call models 
const {Post,User, Comment, Vote,} = require('../models')

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

router.get('/', (req,res) => {
    //using a sequelize query to return all post to populate out homepage template
    //using the Post Model
    Post.findAll({
         //finding with certain attributes 
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),'vote_count']
        ],
        //joins the Comment Model at username and model User at username
        include: [
            {
                model: Comment,
                attributes: ['id','comment_text','post_id','user_id','created_at'],
                include:{
                    model:User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes:['username']
            }
        ]
    })
    .then(dbPostData => {
        //get the entire array of posts 
        //to serialize the object down to only the properties you need use .get()
        const posts = dbPostData.map(post.get({plain:true}));
        //pass a single post object into the homepage template
        res.render('homepage', {posts});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})


module.exports = router;