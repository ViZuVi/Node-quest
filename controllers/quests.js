const path = require('path');

const rootDir = require('../util/path');
const Quest = require('../models/quest');

exports.getMainPage = (req, res, next) => {
  // role admin or user
  Quest.fetchAll()
    .then(([rows, fieldData]) => {
      res.render(path.join(rootDir, 'views', 'quests', 'main-page'), {
        docTitle: 'Quests',
        quests: rows,
        path: '/',
        role: "admin"
      })
    })
    .catch(err => console.error(err))
  // ((quests) => res.render(path.join(rootDir, 'views', 'quests', 'main-page'), { docTitle: 'Quests', quests, path: '/', role: "admin" }));
};

exports.getQuestsPage = (req, res, next) => {
  res.redirect('/');
};

exports.getQuestDetailsPage = (req, res, next) => {
  const questId = req.params.id;
  Quest.getDetailsById(questId)
    .then(([selectedQuest]) => res.render(path.join(rootDir, 'views', 'quests', 'quest-details'), { questDetails: selectedQuest[0] }))
    .catch(err => console.error(err));
};
