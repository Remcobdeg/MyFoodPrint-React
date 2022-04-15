require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/receipts-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use('/api/receipts', placesRoutes); // => /api/receipts... and everything after
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500)
  res.json({message: error.message || 'An unknown error occurred!'});
});

app.listen(5000);

//don't forget: determine dynamically what to patch based on input, rather than forcing input