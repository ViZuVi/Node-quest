const express = require('express');

const router = express.Router();

const buyController = require('../controllers/buy');

router.get('/cart', buyController.getCartPage);

router.get('/shcedule', buyController.getShcedulePage);

router.get('/checkout', buyController.getCheckoutPage);

module.exports = router;
