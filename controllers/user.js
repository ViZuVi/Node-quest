const path = require('path');

const rootDir = require('../util/path');

const User = require('../models/user');

const bcrypt = require('bcryptjs');

exports.getLoginPage = (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'user', 'login'), {
    docTitle: 'Login',
    path: '/login',
    error: req.flash('error'),
  })
};

exports.getSignupPage = (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'user', 'signup'), {
    docTitle: 'Signup',
    path: '/signup',
  })
};

exports.getProfilePage = (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'user', 'profile'), {
    docTitle: 'Login',
    path: '/profile',
  })
};

exports.postLogin = (req, res, next) => {
  const username = req.body.login;
  const password = req.body.password;

  User.findOne({ username })
    .then(user => {
      if (!user) {
        req.flash('error', 'Invalid username or password')
        return res.redirect('/login')
      }
      bcrypt.compare(password, user.password)
        .then(isPasswordValid => {
          if (isPasswordValid) {
            req.session.isAuthorized = true;
            req.session.user = user;
            return req.session.save(err => {
              console.error(err);
              res.redirect('/');
            })
          }
          res.redirect('/login')
        })
    })
    .catch(err => console.error(err));
}

exports.postSignup = (req, res, next) => {
  const username = req.body.login;
  const password = req.body.password;
  const confirmedPassword = req.body.confirm;

  User.findOne({ username })
    .then(user => {
      if (user) {
        res.redirect('/login')
      }
      return bcrypt.hash(password, 12)
        .then(hashedPass => {
          const user = new User({
            username,
            password: hashedPass,
            cart: {
              items: [],
              total: 0
            }
          });
          return user.save();
        })
        .then(() => res.redirect('/login'))
    })
    .catch(err => console.error(err))
}

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.error(err);
    res.redirect('/')
  })
}
