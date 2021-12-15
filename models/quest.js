const Sequelize = require('sequelize');

const sequelize = Sequelize.define('quest', {
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



// module.exports = class Quest {
//   constructor(quest) {
//     this.previewImg = quest.previewImg;
//     this.title = quest.title;
//     this.genre = quest.genre;
//     this.complexity = quest.complexity;
//     this.gamers = quest.gamers;
//     this.id = Date.now();
//   }

//   save() {
//     return db.execute('INSERT INTO quests (title, previewImg, genre, complexity, gamers) VALUES (?, ?, ?, ?, ?)',
//       [this.title, this.previewImg, this.genre, this.complexity, this.gamers]
//     );
//   }

//   static fetchAll() {
//     return db.execute('SELECT * FROM quests');
//   }

//   static getDetailsById(id) {
//     return db.execute('SELECT * FROM quests WHERE quests.id = ?', [id]);
//   }
// };
