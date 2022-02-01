const path = require('path');

const rootDir = require('../util/path');

exports.notFoundPage = (req, res, next) => {
  res.status(404).render(path.join(rootDir, 'views', 'error'), { isAuthorized: req.session.isAuthorized, })
};
