const express = require('express');

const router = express.Router();

const buyController = require('../controllers/buy');

router.get('/cart', buyController.getCartPage);

router.get('/shcedule', buyController.getShcedulePage);

router.get('/orders', buyController.getOrdersPage);

router.post('/cart', buyController.postAdToCart);

router.post('/cart-delete-item', buyController.postDeleteFromCart);

router.post('/checkout', buyController.postOrder)

module.exports = router;
