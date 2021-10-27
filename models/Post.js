// calling sequelize and importing Model class and DataTypes object
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');


//create Post model extending from the Model class
class Post extends Model {

}

Post.init(
    //defining the Post Model's schema
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            //sets id as the primary key
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            //sets the value as a string value
            type: DataTypes.STRING,
            allowNull: false
        },
        post_url: {
            type: DataTypes.STRING,
            allowNull: false,
            //validates to make sure what is getting posted is a URL
            validate: {
                isURL: true
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            //a foreign key that will be linking to the user model
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;