const express = require('express');
const { check } = require('express-validator');

const receiptsControllers = require('../controllers/receipts-controllers');

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
