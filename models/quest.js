const fs = require('fs');
const path = require('path');

const db = require('../util/database');
const rootDir = require('../util/path');

const questPath = path.join(rootDir, 'data', 'quests.json');

const getQuestFromFile = (cb) => {
  fs.readFile(questPath, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  })
};

module.exports = class Quest {
  constructor(quest) {
    this.previewImg = quest.previewImg;
    this.title = quest.title;
    this.genre = quest.genre;
    this.complexity = quest.complexity;
    this.gamers = quest.gamers;
    this.id = Date.now();
  }

  save() {
    return db.execute('INSERT INTO quests (title, previewImg, genre, complexity, gamers) VALUES (?, ?, ?, ?, ?)',
      [this.title, this.previewImg, this.genre, this.complexity, this.gamers]
    );
  }

  static fetchAll() {
    return db.execute('SELECT * FROM quests');
  }

  static getDetailsById(id) {
    return db.execute('SELECT * FROM quests WHERE quests.id = ?', [id]);
  }
};
