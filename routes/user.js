const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

router.get('/login', userController.getLoginPage);

router.get('/profile', userController.getProfilePage);

router.post('/login', userController.postLogin);

router.post('/logout', userController.postLogout);

module.exports = router;
