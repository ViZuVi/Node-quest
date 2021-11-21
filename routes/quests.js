const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render(path.join(__dirname, '..', 'views', 'main-page'))
});

router.get('/quests', (req, res, next) => {
  res.redirect('/')
});

module.exports = router;
