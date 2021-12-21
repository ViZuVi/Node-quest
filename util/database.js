const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-quest', 'root', '123456Q', {
  dialect: 'mysql',
  host: 'localhost',
})

module.exports = sequelize;

// TODO: to env