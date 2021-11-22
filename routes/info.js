const express = require('express');
const path = require('path');

const router = express.Router();

const rootDir = require('../util/path')

router.get('/about', (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'about'), { docTitle: 'About us' })
});

router.get('/rules', (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'rules'), { docTitle: 'Rules' })
});

router.get('/contacts', (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'contacts'), { docTitle: 'Contacts' })
})

module.exports = router;
