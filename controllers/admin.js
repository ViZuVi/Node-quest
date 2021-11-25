const path = require('path');
const rootDir = require('../util/path');

const Quest = require('../models/quest');

exports.getAddQuestPage = (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'admin', 'add-quest'), { docTitle: 'Add quest', path: "/admin/add-quest" })
};

exports.postAddQuest = (req, res, next) => {
  const complexityArr = [];
  // TODO: refactor
  for (let i = 1; i <= 5; i++) {
    i <= req.body['quest-complexity'] ? complexityArr.push(1) : complexityArr.push(0);
  }
  const quest = new Quest({
    previewImg: req.body['quest-img-link'],
    title: req.body['quest-title'],
    genre: req.body['quest-genre'],
    complexity: complexityArr,
    gamers: {
      min: req.body['quest-gamers-min'],
      max: req.body['quest-gamers-max']
    },
  })
  quest.save();
  res.redirect('/');
};

// TODO: add edit
