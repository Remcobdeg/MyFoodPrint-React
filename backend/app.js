require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const moment = require('moment');

const receiptsRoutes = require('./routes/receipts-routes');
const alternativesRoutes = require('./routes/alternatives-routes');
const usersRoutes = require('./routes/users-routes');
const dictRoutes = require('./routes/dict-routes');
const ocrRoutes = require('./routes/ocr-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

// address CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});
  

app.use('/api/receipts', receiptsRoutes); // => /api/receipts... and everything after
app.use('/api/alternatives', alternativesRoutes); 
app.use('/api/dictitems', dictRoutes); 
app.use('/api/users', usersRoutes);
app.use('/api/ocr', ocrRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  return next(error);
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
const database = process.env.DATABASE_NAME;
const clusterName = process.env.CLUSTER_NAME;

mongoose.connect("mongodb+srv://"+mongoUser+":"+mongoPswd+"@cluster0."+clusterName+".mongodb.net/"+database+"?retryWrites=true&w=majority")
.then(() => {
  console.log('Connected to database!');
  app.listen(5000);
}).catch(() => {
  console.log('Connection failed!')
});

//don't forget: determine dynamically what to patch based on input, rather than forcing input
