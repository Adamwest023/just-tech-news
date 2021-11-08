// imports from User Model
const User = require('./User');

//imports the Post Model
const Post = require('./Post');

//imports the Vote Model
const Vote = require('./Vote');

//import Comment Model
const Comment = require('./Comment');

//creates associations between models
User.hasMany(Post, {
    //connects to post through the user_id that is connected to the User(id)
    foreignKey: 'user_id'
});

//reverse association by adding the following statement 
//post can belong to one user, not many users
Post.belongsTo(User, {
    //using same foreign key
    foreignKey: 'user_id',
    onDelete:'SET NULL'
});

//Many to many connections
//Allows both the User and Post models to 
//query each other's information in the context of a vote.
User.belongsToMany(Post, {
    //connects to Post through Vote for the many to many connection
    through: Vote,
    as: 'voted_posts',
    //using the id's provides unique pairings for our queries
    foreignKey: 'user_id'
});

Post.belongsToMany(User, {
    //connects to User through Vote model 
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});

//reverse associations from Vote to other models 
//allows us to create aggregated SQL functions between models
Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

Post.hasMany(Vote, {
    foreignKey: 'post_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
  });
  
  Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
  });
  
  User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
  });
  
  Post.hasMany(Comment, {
    foreignKey: 'post_id'
  });
//exports the Model as an object with Model as a property
module.exports = { User, Post, Vote, Comment };