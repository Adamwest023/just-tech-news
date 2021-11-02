const path = require('path');
const express = require('express');
//the routes variable is set up connecting all of our routes to one point 
const routes = require('./controllers/');
const sequelize = require('./config/connection');

//adds our template engine handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

const app = express();
const PORT = process.env.PORT || 3001;

//middleware 
//allows the server.js to connect to other paths
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//the .static allows for folder contents to be used as static assets which is useful for front-end specific files
app.use(express.static(path.join(__dirname, 'public')));

//middleware for our template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on routes
app.use(routes);

// turn on connection to db and server
//The "sync" part means that this is Sequelize taking the models and connecting them to associated database tables. 
//If it doesn't find a table, it'll create it for you!
//by force: true the database connection must sync with the model definitions and associations
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});