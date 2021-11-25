const path = require('path');

const rootDir = require('../util/path');

exports.getCartPage = (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'buy', 'cart'), { docTitle: 'Cart', path: '/cart' });
};

exports.getShcedulePage = (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'buy', 'shcedule'), { docTitle: 'Shcedule', path: '/shcedule' })
};

exports.getCheckoutPage = (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'buy', 'checkout'), { docTitle: 'Checkout', path: '/checkout' })
};

