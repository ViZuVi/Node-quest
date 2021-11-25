const express = require('express');

const router = express.Router();

const userConreoller = require('../controllers/user');

router.get('/login', userConreoller.getLoginPage);

router.get('/profile', userConreoller.getProfilePage);

module.exports = router;
