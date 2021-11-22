const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const rootDir = require('../util/path')

// admin/add-quest
router.get('/add-quest', (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'admin'), { docTitle: 'Add quest' })
})

router.post('/add-quest', (req, res, next) => {
  res.redirect('/');
})

module.exports = router;
