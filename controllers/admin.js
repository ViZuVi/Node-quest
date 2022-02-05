// TODO: write tests
const path = require('path');
const rootDir = require('../util/path');

const Quest = require('../models/quest');

exports.getAddQuestPage = (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'admin', 'edit-quest'), {
    docTitle: 'Add quest',
    path: '/admin/add-quest',
  })
};

exports.postAddQuest = (req, res, next) => {
  const previewImg = req.body['quest-img-link'];
  const title = req.body['quest-title'];
  const genre = req.body['quest-genre'];
  const complexity = req.body['quest-complexity'];
  const gamers = 2; // TODO: hardcoded; change
  const price = req.body['quest-price'];
  const userId = req.user // it's ok in Mongoose to pass entire user; However we can pass req.user._id

  const quest = new Quest({ previewImg, title, genre, complexity, gamers, price, userId });

  quest.save()
    .then(result => res.redirect('/'))
    .catch(err => console.error(err))

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
  Quest.findById(req.params.id)
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
  const questId = req.body.id;

  Quest.findById(questId).then(quest => {
    quest.previewImg = req.body['quest-img-link'];
    quest.title = req.body['quest-title'];
    quest.genre = req.body['quest-genre'];
    quest.complexity = req.body['quest-complexity'];
    quest.gamers = 2;// TODO: hardcoded; change
    quest.price = req.body['quest-price'];
    return quest.save();
  })
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
}

exports.postDeleteQuest = (req, res, next) => {
  Quest.findByIdAndRemove(req.body.id)
    .then(() => res.redirect('/'))
    .catch((err) => console.error(err))
}
