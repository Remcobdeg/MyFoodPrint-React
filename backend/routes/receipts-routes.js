const express = require('express');
const { check } = require('express-validator');
const mongoose = require('mongoose');


const receiptsControllers = require('../controllers/receipts-controllers');

const mongoUser = process.env.MONGO_USER;
const mongoPswd = process.env.MONGO_PASSWORD;

mongoose.connect("mongodb+srv://"+mongoUser+":"+mongoPswd+"@cluster0.orklo.mongodb.net/MyFoodPrintTest?retryWrites=true&w=majority")
.then(() => {
  console.log('Connected to database!')
}).catch(() => {
  console.log('Connection failed!')
});

const router = express.Router();

router.get('/:rcptid', receiptsControllers.getReceiptById);

router.get('/user/:uid', receiptsControllers.getReceiptByUserId);

router.post(
  '/',
  [
    check(['date','store','items','user'])
      .not()
      .isEmpty()
  ],
  receiptsControllers.createReceipt
);

router.patch(
  '/:rcptid',
  [
    check(['date','store'])
      .not()
      .isEmpty()
  ],
  receiptsControllers.updateReceipt
);

router.delete('/:rcptid', receiptsControllers.deleteReceipt);

module.exports = router;
