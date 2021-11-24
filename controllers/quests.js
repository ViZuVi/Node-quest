const path = require('path');

const rootDir = require('../util/path');
const quests = require('../data.json')

exports.getMainPage = (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'main-page'), { docTitle: 'Quests', quests })
};

exports.getQuestsPage = (req, res, next) => {
  res.redirect('/')
};

exports.getShcedulePage = (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'shcedule'), { docTitle: 'Shcedule' })
}
