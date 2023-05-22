const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const routes = require('./controllers');
const helpers = require('./utils/helpers');

// Used to check model building:
const Colors = require('./models/Colors');
const Elements = require('./models/Elements');
const Inventories = require('./models/Inventories');
const Inventory_Minifigs = require('./models/Inventory_Minifigs');
const Inventory_Parts = require('./models/Inventory_Parts');
const Inventory_Sets = require('./models/Inventory_Sets');
const Minifigs = require('./models/Minifigs');
const Part_Categories = require('./models/Part_Categories');
const Part_Relationships = require('./models/Part_Relationships');
const Parts = require('./models/Parts');
const Sets = require('./models/Sets');
const Themes = require('./models/Themes');
const User_Inventories = require('./models/User_Inventories');
const Users = require('./models/Users');

const { sequelize } = require('./config/connection'); 
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
