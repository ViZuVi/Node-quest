const e = require('express');
const fs = require('fs');
const path = require('path');

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
}

module.exports = class Quest {
  constructor(quest) {
    this.previewImg = quest.previewImg;
    this.title = quest.title;
    this.genre = quest.genre;
    this.complexity = quest.complexity;
    this.gamers = quest.gamers;
  }

  save() {
    let quests = [];
    getQuestFromFile((savedQuests) => {
      quests = [...savedQuests, this];
      fs.writeFile(questPath, JSON.stringify(quests), err => {
        console.error('Error: ', err);
      })
    })
  }

  static fetchAll(renderQuest) {
    getQuestFromFile(renderQuest);
  }
};
