const express = require('express');
const path = require('path');

const app = express();

const adminRoutes = require('./routes/admin');
const questRoutes = require('./routes/quests')

app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(adminRoutes);
app.use(questRoutes);
app.use((req, res, next) => {
  res.status(404).render(path.join(__dirname, 'views', 'error'))
});

app.listen(3000);