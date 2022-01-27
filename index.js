require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');

const app = express();

const adminRoutes = require('./routes/admin');
const questRoutes = require('./routes/quests');
const infoRoutes = require('./routes/info');
const buyRoutes = require('./routes/buy');
const userRoutes = require('./routes/user');

const errorsController = require('./controllers/errors');

app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

const User = require('./models/user');

app.use((req, res, next) => {
  User.findById('61f1a7e8d824c96c5be96ef0') // TODO: hardcoded for now; fix after auth implementing 
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.error(err));
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/admin', adminRoutes);
app.use(questRoutes);
app.use(infoRoutes);
app.use(buyRoutes);
app.use(userRoutes);
app.use(errorsController.notFoundPage);

mongoose.connect(process.env.DATABASE_NODE_QUEST)
  .then(() => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Jane',
          email: 'test@test.test',
          cart: {
            items: [],
            total: 0
          }
        });
        user.save();
      }
    })
    app.listen(3000);
  })
  .catch(err => console.error(err))