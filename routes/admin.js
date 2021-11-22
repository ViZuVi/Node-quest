const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/add-quest', (req, res, next) => {
  res.render(path.join(__dirname, '..', 'views', 'admin'))
}) // admin/add-quest

router.post('/add-quest', (req, res, next) => {
  res.redirect('/');
})

module.exports = router;
