const express = require('express');

const router = express.Router();

const adminController = require('../controllers/adminController');

router.get('/add-quest', adminController.getAddQuestPage); // admin/add-quest

router.post('/add-quest', adminController.postAddQuest);

module.exports = router;
