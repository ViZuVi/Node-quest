const path = require('path');
const rootDir = require('../util/path');

const Quest = require('../models/quest');
const Order = require('../models/order');

exports.getCartPage = (req, res, next) => {
  req.user
    .populate('cart.items.questId')
    .then(user => {
      const quests = user.cart.items;
      const total = user.cart.total;
      res.render(path.join(rootDir, 'views', 'buy', 'cart'), {
        docTitle: 'Cart',
        path: '/cart',
        quests,
        total,
        isAuthorized: req.session.isAuthorized,
      });
    })
};

exports.getShcedulePage = (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'buy', 'shcedule'), {
    docTitle: 'Shcedule',
    path: '/shcedule',
    isAuthorized: req.session.isAuthorized,
  })
};

exports.getOrdersPage = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .then(orders => {
      res.render(path.join(rootDir, 'views', 'buy', 'orders'), {
        docTitle: 'Orders',
        path: '/orders',
        orders,
        isAuthorized: req.session.isAuthorized,
      })
    })
};

exports.postAdToCart = (req, res, next) => {
  Quest.findById(req.body.id)
    .then(quest => req.user.addToCart(quest))
    .then(() => res.redirect('/cart'))
}

exports.postDeleteFromCart = (req, res, next) => {
  req.user.deleteItemFromCart(req.body.id)
    .then(() => res.redirect('/cart'))
}

exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.questId')
    .then((user) => {
      const quests = user.cart.items.map((item) => ({ quest: { ...item.questId._doc }, quantity: item.quantity }));
      const date = new Date();
      const order = new Order({
        quests,
        total: user.cart.total,
        user: {
          name: req.user.name,
          userId: req.user
        },
        date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
      });
      return order.save();
    })
    .then(() => res.redirect('/orders'))
    .then(() => req.user.clearCart())
}

