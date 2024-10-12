const express = require('express');
// const city = require('./src/routes/city');
// const country = require('./src/routes/country');
// const countrylanguage = require('./src/routes/countrylanguage');
const sharpner = require('./src/routes/sharpner')
const app = express();
// Middleware to parse JSON
app.use(express.json());
const port = 4400;

// Use the routes defined in routes.js
// app.use('/cities', city);
// app.use('/countries', country);
// app.use('/countryLanguage', countrylanguage);
app.use('/sharpner', sharpner);


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});