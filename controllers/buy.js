const path = require('path');

const rootDir = require('../util/path');

exports.getCartPage = (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'buy', 'cart'), {
    docTitle: 'Cart',
    path: '/cart',
    quests: [{ id: 1, title: "Test", price: 123 }, { id: 2, title: "Test2", price: 323 }],
    total: 346
  });
};

exports.getShcedulePage = (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'buy', 'shcedule'), { docTitle: 'Shcedule', path: '/shcedule' })
};

exports.getCheckoutPage = (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'buy', 'checkout'), { docTitle: 'Checkout', path: '/checkout' })
};

