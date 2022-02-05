const express = require('express');

const router = express.Router();

const buyController = require('../controllers/buy');

const isAuth = require('../middleware/is-auth')

router.get('/cart', isAuth, buyController.getCartPage);

router.get('/shcedule', buyController.getShcedulePage);

router.get('/orders', isAuth, buyController.getOrdersPage);

router.post('/cart', isAuth, buyController.postAdToCart);

router.post('/cart-delete-item', isAuth, buyController.postDeleteFromCart);

router.post('/checkout', isAuth, buyController.postOrder)

module.exports = router;
