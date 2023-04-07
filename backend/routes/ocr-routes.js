const express = require('express');
const checkAuth = require('../middleware/check-auth');

const ocrControllers = require('../controllers/ocr-controllers');

const router = express.Router();

router.use(checkAuth);

router.post('/fetchDataFromImage', ocrControllers.fetchDataFromImage);

router.get('/getDateFromImage/:imageName', ocrControllers.getDateFromImage);

module.exports = router;