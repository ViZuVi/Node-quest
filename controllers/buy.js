const path = require('path');
const rootDir = require('../util/path');

const Quest = require('../models/quest');

exports.getCartPage = (req, res, next) => {
  req.user
    .getCart()
    .then(quests => {
      res.render(path.join(rootDir, 'views', 'buy', 'cart'), {
        docTitle: 'Cart',
        path: '/cart',
        quests,
        total: 346
      });
    })
};

exports.getShcedulePage = (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'buy', 'shcedule'), { docTitle: 'Shcedule', path: '/shcedule' })
};

exports.getOrdersPage = (req, res, next) => {
  req.user.getOrders()
    .then(orders => {
      res.render(path.join(rootDir, 'views', 'buy', 'orders'), { docTitle: 'Orders', path: '/orders', orders })
    })
};

exports.postAdToCart = (req, res, next) => {
  Quest.findQuest(req.body.id)
    .then(quest => req.user.addToCart(quest))
    .then(() => res.redirect('/cart'))
}

exports.postDeleteFromCart = (req, res, next) => {
  req.user.deleteItemFromCart(req.body.id)
    .then(() => res.redirect('/cart'))
}

exports.postOrder = (req, res, next) => {
  req.user.addOrder()
    .then(() => res.redirect('/orders'))
}

