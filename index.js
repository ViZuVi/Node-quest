require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const app = express();
const store = new MongoDBStore({
  uri: process.env.DATABASE_NODE_QUEST,
  collection: 'sessions',
});

const csrfProtection = csrf();

const adminRoutes = require('./routes/admin');
const questRoutes = require('./routes/quests');
const infoRoutes = require('./routes/info');
const buyRoutes = require('./routes/buy');
const userRoutes = require('./routes/user');

const errorsController = require('./controllers/errors');

app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

const User = require('./models/user');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'very long string should be here', resave: false, saveUninitialized: false, store }))

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthorized = req.session.isAuthorized;
  res.locals.csrfToken = req.csrfToken();
  next();
})

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.error(err));
})


app.use('/admin', adminRoutes);
app.use(questRoutes);
app.use(infoRoutes);
app.use(buyRoutes);
app.use(userRoutes);
app.use(errorsController.notFoundPage);

mongoose.connect(process.env.DATABASE_NODE_QUEST)
  .then(() => {
    app.listen(3000);
  })
  .catch(err => console.error(err))