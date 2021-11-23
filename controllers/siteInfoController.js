const path = require('path');
const rootDir = require('../util/path')

exports.getAboutPage = (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'about'), { docTitle: 'About us' })
};

exports.getRulesPage = (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'rules'), { docTitle: 'Rules' })
};

exports.getContactsPage = (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'contacts'), { docTitle: 'Contacts' })
};
