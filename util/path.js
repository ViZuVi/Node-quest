const path = require('path');

// gives the path to the root file - index.js in our case
module.exports = path.dirname(require.main.filename);
