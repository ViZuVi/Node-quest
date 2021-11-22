const express = require('express');
const path = require('path');

const router = express.Router();

const rootDir = require('../util/path')
const quests = require('../data.json')

router.get('/', (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'main-page'), { docTitle: 'Quests', quests })
});

router.get('/quests', (req, res, next) => {
  res.redirect('/')
});

router.get('/shcedule', (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'shcedule'), { docTitle: 'Shcedule' })
});

module.exports = router;
