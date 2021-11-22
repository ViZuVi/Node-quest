const express = require('express');
const path = require('path');
const router = express.Router();

const rootDir = require('../util/path')

router.get('/about', (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'about'))
});

router.get('/rules', (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'rules'))
});

router.get('/contacts', (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'contacts'))
})

module.exports = router;
