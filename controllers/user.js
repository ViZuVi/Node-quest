const path = require('path');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_EMAIL_KEY);

const rootDir = require('../util/path');
const User = require('../models/user');


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

exports.getRestore = (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'user', 'restore'), {
    docTitle: 'Restore',
    error: req.flash('error'),
  })
};

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    .then((user) => {
      res.render(path.join(rootDir, 'views', 'user', 'new-password'), {
        docTitle: 'New password',
        userId: user._id.toString(),
        passwordToken: token,
      })
    })
    .catch(err => console.error(err));

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
            // create email field when for user
            password: hashedPass,
            cart: {
              items: [],
              total: 0
            }
          });
          return user.save();
        })
        .then(() => {
          res.redirect('/login');
          const msg = {
            to: 'zukhrael@yandex.com', // TODO: add user email
            from: 'zukhrab29@gmail.com', // Use the email address or domain you verified above
            subject: 'Welcome to Node-quest',
            text: 'You succesfully signed in!',
            html: '<strong>You succesfully signed in!</strong>',
          };
          return sgMail.send(msg);
        })
    })
    .catch(err => console.error(err))
}

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.error(err);
    res.redirect('/')
  })
}

exports.postRestore = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.error(err)
      return res.redirect('/')
    }
    const token = buffer.toString('hex');
    const username = req.body.login;

    User.findOne({ username })
      .then((user) => {
        if (!user) {
          req.flash('error', 'No account with that username');
          return res.redirect('/restore')
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then((result) => {
        res.redirect('/');
        const msg = {
          to: 'zukhrael@yandex.com', // TODO: add user email - req.body.email
          from: 'zukhrab29@gmail.com', // Use the email address or domain you verified above
          subject: 'Welcome to Node-quest',
          text: 'Password reset',
          html: `
            <p>You recieved this email because password reset was requested.</p>
            <p>Click the link below to reset password (The link is valid only for one hour).</p>
            <a>http://localhost:3000/restore/${token}</a>
          `,
        };
        return sgMail.send(msg);
      })
      .catch(err => console.error(err));
  })
}

exports.postNewPassword = (req, res, next) => {
  const password = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  let resetUser;

  User.findOne({ resetToken: passwordToken, resetTokenExpiration: { $gt: Date.now() }, _id: userId })
    .then(user => {
      resetUser = user;
      return bcrypt.hash(password, 12)
    })
    .then(hashedPass => {
      resetUser.password = hashedPass; 
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    })
    .then(() => res.redirect('/login'))
    .catch(err => console.error(err));
}
