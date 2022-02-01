const path = require('path');

const rootDir = require('../util/path');

const User = require('../models/user');

exports.getLoginPage = (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'user', 'login'), {
    docTitle: 'Login',
    path: '/login',
    isAuthorized: req.session.isAuthorized,
  })
};

exports.getProfilePage = (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'user', 'profile'), {
    docTitle: 'Login',
    path: '/profile',
    isAuthorized: req.session.isAuthorized,
  })
};

exports.postLogin = (req, res, next) => {
  User.findById('61f1a7e8d824c96c5be96ef0') // TODO: hardcoded for now; fix after auth implementing 
  .then(user => {
      req.session.isAuthorized = true;
      req.session.user = user;
      req.session.save(err => {
        console.error(err);
        res.redirect('/');
      })
    })
    .catch(err => console.error(err));
}

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.error(err);
    res.redirect('/')
  })
}
