// TODO: write tests

const path = require('path');
const rootDir = require('../util/path');

const Quest = require('../models/quest');

exports.getAddQuestPage = (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'admin', 'edit-quest'), { docTitle: 'Add quest', path: '/admin/add-quest' })
};

exports.postAddQuest = (req, res, next) => {
  Quest.create({
    previewImg: req.body['quest-img-link'],
    title: req.body['quest-title'],
    genre: req.body['quest-genre'],
    complexity: req.body['quest-complexity'],
    gamers: 2 // TODO: hardcoded; change
  }).then(result => res.redirect('/')).catch(err => console.error(err))

  // gamers: {
  //   min: req.body['quest-gamers-min'],
  //   max: req.body['quest-gamers-max']
  // },
};

exports.getEditQuestPage = (req, res, next) => {
  if (!req.query.edit) {
    res.render(path.join(rootDir, 'views', 'admin', 'edit-quest'), {
      docTitle: 'Add quest',
      path: '/admin/edit-quest',
    })
  }
  Quest.findByPk(req.params.id)
    .then(quest => {
      res.render(path.join(rootDir, 'views', 'admin', 'edit-quest'), {
        docTitle: 'Edit quest',
        path: '/admin/edit-quest',
        quest,
        isEdit: true,
      })
    })
    .catch(err => console.error(err))
}

exports.postEditQuest = (req, res, next) => {
  Quest.findByPk(req.body.id)
    .then(quest => {
      quest.previewImg = req.body['quest-img-link'];
      quest.title = req.body['quest-title'];
      quest.genre = req.body['quest-genre'];
      quest.complexity = req.body['quest-complexity'];
      quest.gamers = 2;// TODO: hardcoded; change
      return quest.save();
    })
    .then(result => res.redirect('/'))
    .catch(err => console.error(err))
}
