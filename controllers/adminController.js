const path = require('path');

const rootDir = require('../util/path');

exports.getAddQuestPage = (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'admin'), { docTitle: 'Add quest' })
};

exports.postAddQuest = (req, res, next) => {
  res.redirect('/');
};
