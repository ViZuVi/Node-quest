const express = require('express');
const path = require('path');

const app = express();

const adminRoutes = require('./routes/admin');
const questRoutes = require('./routes/quests');
const infoRoutes = require('./routes/info');
const buyRoutes = require('./routes/buy');
const userRoutes = require('./routes/user');

const errorsController = require('./controllers/errors');

const sequelize = require('./util/database');

const Quest = require('./models/quest');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findByPk(1)
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

Quest.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Quest);
User.hasOne(Cart);
Cart.belongsTo(User); // not nessesary; equals to prev
Cart.belongsToMany(Quest, { through: CartItem});
Quest.belongsToMany(Cart, { through: CartItem});

sequelize
  // .sync({ force: true }) // force needed only once to create relations; don't needed in prod
  .sync()
  .then(() => {
    return User.findByPk(1)
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: 'John', email: 'test@test.com' });
    }
    return user;
  })
  .then(() => app.listen(3000))
  .catch(err => console.error(err));

