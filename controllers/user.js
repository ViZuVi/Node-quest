const path = require('path');

const rootDir = require('../util/path');

exports.getLoginPage = (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'user', 'login'), { docTitle: 'Login', path: '/login' })
};

exports.getProfilePage = (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'user', 'profile'), { docTitle: 'Login', path: '/profile' })
};
