const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Quest = sequelize.define('quest', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true, 
  },
  previewImg: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  genre: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  complexity: { 
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  gamers: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
})

module.exports = Quest;
