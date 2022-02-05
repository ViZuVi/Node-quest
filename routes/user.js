const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

const isAuth = require('../middleware/is-auth');

router.get('/login', userController.getLoginPage);

router.get('/signup', userController.getSignupPage);

router.get('/profile', isAuth, userController.getProfilePage);

router.post('/login', userController.postLogin);

router.post('/signup', userController.postSignup);

router.post('/logout', userController.postLogout);

module.exports = router;
