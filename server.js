const express = require('express');
//the routes variable is set up connecting all of our routes to one point 
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// turn on connection to db and server
//The "sync" part means that this is Sequelize taking the models and connecting them to associated database tables. 
//If it doesn't find a table, it'll create it for you!
//by force: true the database connection must sync with the model definitions and associations
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});