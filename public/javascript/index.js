const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const port = 3001;

// Set up Handlebars as the view engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Define routes
app.get('/', (req, res) => {
  res.render('home', { name: 'Handlebars' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
