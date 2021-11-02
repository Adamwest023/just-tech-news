//calls router
const router = require('express').Router();

//route for homepage
router.get('/', (req,res) => {
    //can use .render now that we are using a template engine
    //this specifies which template we want to use 
    //i.e. homepage.handlebars(.handlebars is implied) template
    res.render('homepage');
});


module.exports = router;