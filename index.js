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

app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/admin', adminRoutes);
app.use(questRoutes);
app.use(infoRoutes);
app.use(buyRoutes);
app.use(userRoutes);
app.use(errorsController.notFoundPage);

sequelize.sync().then(() => { app.listen(3000); }).catch(err => console.error(err));

