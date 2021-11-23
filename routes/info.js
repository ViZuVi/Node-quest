const express = require('express');

const router = express.Router();

const siteInfoController = require('../controllers/siteInfoController')

router.get('/about', siteInfoController.getAboutPage);

router.get('/rules', siteInfoController.getRulesPage);

router.get('/contacts', siteInfoController.getContactsPage);

module.exports = router;
