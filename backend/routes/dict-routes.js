const express = require('express');
const checkAuth = require('../middleware/check-auth');

const dictControllers = require('../controllers/dict-controllers');

const router = express.Router();

router.use(checkAuth); //checks if there's a token and adds userId to req from decomposed token

router.get('/', dictControllers.getDictItems);

router.get('/:item', dictControllers.getDictItemByItem);

router.post(
  '/',
  dictControllers.createDictItems
);

router.patch(
  '/:item',
  dictControllers.updateDictItem
);

router.delete('/:item', dictControllers.deleteDictItem);

module.exports = router;
