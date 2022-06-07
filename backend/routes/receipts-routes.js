const express = require('express');
const { check } = require('express-validator');
const checkAuth = require('../middleware/check-auth');

const receiptsControllers = require('../controllers/receipts-controllers');

const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, 'image-' + req.params.userId + "-" + Date.now() + '.jpg');
  }
})

const imageUpload = multer({ storage: storage });

router.get('/:rcptid', receiptsControllers.getReceiptById);

router.post(
  '/uploadImage/:userId', async (req, res) => {
    var uploadPost = imageUpload.single('imageFile');
    uploadPost(req, res, function (err) {
      if (err) {
        return res.end("error uploading file");
      }
      return res.send(req.file.filename);
    });
  }
);

router.use(checkAuth); //checks if there's a token and adds userId to req from decomposed token

router.get('/user/:uid', receiptsControllers.getReceiptByUserId);

router.post(
  '/',
  [
    check(['date', 'store', 'item_group', 'item_subgroup', 'item_product', 'item_product_detail', 'item_footprint_g_100g', 'item_weight_g', 'item_unit_price_gbp', 'item_units', 'item_footprint_sourcenote'])
      .not()
      .isEmpty()
  ],
  receiptsControllers.createReceipt
);

router.post(
  '/many',
  [
    check(['.*.date', '.*.store', '.*.item_group'])
      .not()
      .isEmpty()
  ],
  receiptsControllers.createReceiptMany
);

router.patch(
  '/:rcptid',
  [
    check(['date', 'store'])
      .not()
      .isEmpty()
  ],
  receiptsControllers.updateReceipt
);

router.delete('/:rcptid', receiptsControllers.deleteReceipt);

router.get('/fetchImage/:imageName', receiptsControllers.fetchImageByName);

router.delete('/deleteImage/:imageName', receiptsControllers.deleteImageByName);

router.get('/fetch/ImageList', receiptsControllers.fetchImageList);

router.get('/fetchDetailsByImage/:imageName', receiptsControllers.fetchDetailsByImage);

module.exports = router;
