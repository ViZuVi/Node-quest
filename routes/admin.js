const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/add-quest', adminController.getAddQuestPage); // admin/add-quest

router.get('/edit-quest/:id', adminController.getEditQuestPage); // admin/edit-quest

router.post('/add-quest', adminController.postAddQuest);

router.post('/edit-quest', adminController.postEditQuest);

router.post('/delete', adminController.postDeleteQuest);

module.exports = router;
