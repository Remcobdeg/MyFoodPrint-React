require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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

// connect to mongo db and fire up server if successful
const mongoUser = process.env.MONGO_USER;
const mongoPswd = process.env.MONGO_PASSWORD;

mongoose.connect("mongodb+srv://"+mongoUser+":"+mongoPswd+"@cluster0.orklo.mongodb.net/MyFoodPrintTest?retryWrites=true&w=majority")
.then(() => {
  console.log('Connected to database!');
  app.listen(5000);
}).catch(() => {
  console.log('Connection failed!')
});

//don't forget: determine dynamically what to patch based on input, rather than forcing input