const express = require('express');
const { check } = require('express-validator');

const receiptsControllers = require('../controllers/receipts-controllers');

const router = express.Router();

router.get('/:rcptid', receiptsControllers.getReceiptById);

router.get('/user/:uid', receiptsControllers.getReceiptByUserId);

router.post(
  '/',
  [
    check(['date','store','item_group', 'item_subgroup', 'item_product','item_product_detail','item_footprint_g_100g','item_weight_g','item_unit_price_gbp','item_units','item_footprint_sourcenote']) 
      .not()
      .isEmpty()
  ],
  receiptsControllers.createReceipt
);

router.post(
  '/many',
  [
    check(['.*.date','.*.store','.*.item_group']) 
      .not()
      .isEmpty()
  ],
  receiptsControllers.createReceiptMany
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
