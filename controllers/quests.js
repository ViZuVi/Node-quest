const path = require('path');

const rootDir = require('../util/path');
const Quest = require('../models/quest');

exports.getMainPage = (req, res, next) => {
  // role admin or user
  Quest.find()
    // .select('title price -_id') // allows to include or exclude fields you want
    // .populate('userId', 'username')
    .then((quests) => {
      res.render(path.join(rootDir, 'views', 'quests', 'main-page'), {
        docTitle: 'Quests',
        quests: quests,
        path: '/',
        role: 'user', // TODO: move to collection users
      })
    })
    .catch(err => console.error(err))
};

exports.getQuestsPage = (req, res, next) => {
  res.redirect('/');
};

exports.getQuestDetailsPage = (req, res, next) => {
  const questId = req.params.id;
  Quest.findById(questId)
    .then(quest => res.render(path.join(rootDir, 'views', 'quests', 'quest-details'), {
      questDetails: quest,
    }))
    .catch(err => console.error(err));
};
