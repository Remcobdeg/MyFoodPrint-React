const express = require('express');
const checkAuth = require('../middleware/check-auth');

const alternativesControllers = require('../controllers/alternatives-controllers');

const router = express.Router();

router.use(checkAuth); //checks if there's a token and adds userId to req from decomposed token

router.get('/:product', alternativesControllers.getAlternativesByProduct);

router.post(
  '/',
  alternativesControllers.createAlternative
);

router.patch(
  '/:altid',
  alternativesControllers.updateAlternative
);

router.delete('/:altid', alternativesControllers.deleteAlternative);

module.exports = router;
