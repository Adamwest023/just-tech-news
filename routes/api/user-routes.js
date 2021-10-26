//calling router 
const router = require('express').Router();

//calling our User Model 
const { User } = require('../../models');

//Get /api/users
router.get('/', (req,res) => {
    // Access our User model and run .findAll() method similar to the sql query `SELECT * FROM users;`
    User.findAll({
        attributes: {exclude: ['password']}
    })
    //return all found data to a json object
        .then(dbUserData => res.json(dbUserData))
    //catch any errors and return the error message as a json object
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Get /api/users/1
router.get('/:id',(req,res) => {
    //for a single return we use the .findOne() method
    User.findOne({
        attributes: { exclude: ['password'] },
        //parameters for our search
        where:{
            id: req.params.id
        }
    })
    //returning our search to the json object
    .then(dbUserData => {
        //if no data at that id 
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    //catch any errors
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//POST api user
router.post('/',(req,res) => {
    //expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    //adds information to the dbUserData json object
    .then(dbUserData => res.json(dbUserData))
    //catch any errors
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Post api/users/1
router.post('/:id',(req,res) => {
    // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    //uses the update() to update a user from a specific id
    User.update(req.body, {
        //uses the given id
        where:{
            id:req.params.id
        }
    })
    .then(dbUserData => {
        //if no user at that id
        if(!dbUserData[0]){
            res.status(404).json({message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Delete /api/users/1
router.delete('/:id', (req,res) => {
    //uses destroy() method to delete user
    User.destroy({
        //location of where to delete
        id: req.params.id
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({message: 'No used found with this id'});
        }
        res.json(dbUserData);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
