// TODO: write tests

const path = require('path');
const rootDir = require('../util/path');

const Quest = require('../models/quest');

exports.getAddQuestPage = (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'admin', 'add-quest'), { docTitle: 'Add quest', path: "/admin/add-quest" })
};

exports.postAddQuest = (req, res, next) => {
  Quest.create({
    previewImg: req.body['quest-img-link'],
    title: req.body['quest-title'],
    genre: req.body['quest-genre'],
    complexity: req.body['quest-complexity'],
    gamers: 2 // TODO: hardcoded; change
  }).then(res => console.log('Quest created')).catch(err => console.error(err))
    
    // gamers: {
    //   min: req.body['quest-gamers-min'],
    //   max: req.body['quest-gamers-max']
    // },
};

exports.editQuest = (req, res, next) => {
  console.log(req)
}

// TODO: add edit
