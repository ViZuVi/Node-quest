const express = require('express');
const path = require('path');

const router = express.Router();
const rootDir = require('../util/path')

router.get('/', (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'main-page'))
});

router.get('/quests', (req, res, next) => {
  res.redirect('/')
});

router.get('/shcedule', (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'shcedule'))
});

module.exports = router;
