const path = require('path');

const rootDir = require('../util/path');
const Quest = require('../models/quest');

exports.getMainPage = (req, res, next) => {
  Quest.fetchAll((quests) => res.render(path.join(rootDir, 'views', 'quests', 'main-page'), { docTitle: 'Quests', quests }));
};

exports.getQuestsPage = (req, res, next) => {
  res.redirect('/')
};

exports.getShcedulePage = (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'quests', 'shcedule'), { docTitle: 'Shcedule' })
};
