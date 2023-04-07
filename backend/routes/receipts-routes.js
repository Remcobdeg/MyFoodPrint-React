require('dotenv').config();
const express = require('express');
const { check } = require('express-validator');
const checkAuth = require('../middleware/check-auth');

const receiptsControllers = require('../controllers/receipts-controllers');
const remoteFileStoreControllers = require('../controllers/file-uploader-s3');

const FOLDER = process.env.DOSPACE_FOLDER;

const router = express.Router();

// // --- code to save image in local storage ---
// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'images');
//   },
//   filename: (req, file, cb) => {
//     cb(null, 'image-' + req.params.userId + "-" + Date.now() + '.jpg');
//   }
// })

// const imageUpload = multer({ storage: storage });

router.get('/:rcptid', receiptsControllers.getReceiptById);

// router.post(
//   '/uploadImage/:userId', async (req, res) => {
//     var uploadPost = imageUpload.single('imageFile');
//     uploadPost(req, res, function (err) {
//       if (err) {
//         return res.end("error uploading file");
//       }
//       return res.send(req.file.filename);
//     });
//   }
// );

// ---- END code to save image in local storage ----

// ---- code to save image in Digital Ocean Bucket ----

router.post('/uploadImage/:userId', async function (req, res) { //, next) {
  
  const singleUpload = remoteFileStoreControllers.upload.single('imageFile');
  
  singleUpload(req, res, function (err) {
    if (err) {
      console.log("s3 upload error "+err);
      return res.end("s3 file upload error");
    }
    console.log('File uploaded successfully.');
    console.log("response: "+req.file);
    console.log("response: "+req.file.key);
    console.log("response: "+req.file.key.replace(FOLDER, ""));

    return res.send(req.file.key.replace(FOLDER, ""));
    // return res.json({ imageUrl: req.file.location });

  });
});

// ---- END code to save image in local storage ----

router.use(checkAuth); //checks if there's a token and adds userId to req from decomposed token

router.get('/user/:uid', receiptsControllers.getReceiptByUserId);

router.post(
  '/',
  [
    check(['date', 'store', 'item_group', 'item_subgroup', 'item_product', 'item_footprint_g_100g', 'item_weight_g', 'item_unit_price_gbp', 'item_units', 'item_footprint_sourcenote'])
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

router.get('/fetchImage/:imageName', remoteFileStoreControllers.download); 


router.delete('/deleteImage/:imageName', remoteFileStoreControllers.deleteFile); 

router.get('/fetch/ImageList', receiptsControllers.fetchImageList);

router.get('/fetchDetailsByImage/:imageName', receiptsControllers.fetchDetailsByImage);

module.exports = router;
