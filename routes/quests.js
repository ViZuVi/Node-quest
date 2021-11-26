const express = require('express');

const router = express.Router();

const questsController = require('../controllers/quests');

router.get('/', questsController.getMainPage);

router.get('/quests', questsController.getQuestsPage);

router.get('/quests/:id', questsController.getQuestDetailsPage);

module.exports = router;
