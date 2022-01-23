require('dotenv').config();
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

const mongoConnect = require('./util/database').mongoConnect;

const User = require('./models/user');

app.use((req, res, next) => {
  User.findUser('61dbd3fb3e8f6cc599a64106') // TODO: hardcoded for now; fix after auth implementing 
    .then(user => {
      req.user = new User(user.name, user.email, user.cart, user._id);
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

mongoConnect(() => app.listen(3000))
