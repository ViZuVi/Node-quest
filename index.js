const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
  res.render(path.join(__dirname, 'views', 'main-page'))
});

app.listen(3000);