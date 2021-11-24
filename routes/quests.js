const express = require('express');

const router = express.Router();

const questsController = require('../controllers/questsController');

router.get('/', questsController.getMainPage);

router.get('/quests', questsController.getQuestsPage);

router.get('/shcedule', questsController.getShcedulePage);

module.exports = router;
