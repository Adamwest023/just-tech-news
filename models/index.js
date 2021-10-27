// imports from User Model
const User = require('./User');

//imports the Post Model
const Post = require('./Post');

//creates associations between models
User.hasMany(Post, {
   //connects to post through the user_id that is connected to the User(id)
    foreignKey: 'user_id'
});

//reverse association by adding the following statement 
//post can belong to one user, not many users
Post.belongsTo(User, {
    //using same foreign key
    foreignKey: 'user_id'
});


//exports the Model as an object with Model as a property
module.exports = { User, Post };