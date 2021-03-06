const path = require('path');

const rootDir = require('../util/path');

exports.getAboutPage = (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'info', 'about'), {
    docTitle: 'About us',
    path: '/about',
  })
};

exports.getRulesPage = (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'info', 'rules'), {
    docTitle: 'Rules',
    path: '/rules',
  })
};

exports.getContactsPage = (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'info', 'contacts'), {
    docTitle: 'Contacts',
    path: '/contacts',
  })
};
