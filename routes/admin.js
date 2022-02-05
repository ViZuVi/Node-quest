const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

const isAuth = require('../middleware/is-auth');

router.get('/add-quest', isAuth, adminController.getAddQuestPage); // admin/add-quest

router.get('/edit-quest/:id', isAuth, adminController.getEditQuestPage); // admin/edit-quest

router.post('/add-quest', isAuth, adminController.postAddQuest);

router.post('/edit-quest', isAuth, adminController.postEditQuest);

router.post('/delete', isAuth, adminController.postDeleteQuest);

module.exports = router;
