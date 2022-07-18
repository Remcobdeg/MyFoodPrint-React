const express = require('express');

const usersController = require('../controllers/users-controllers');
const checkAuth = require('../middleware/check-auth');
const checkAdmin = require('../middleware/check-admin');

const router = express.Router();

router.use(checkAuth);
router.use(checkAdmin);

router.post('/',usersController.createInvitedUsers);

router.get('/',usersController.getInvitedUsers);

module.exports = router;
