const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Quest {
  constructor(previewImg, title, genre, complexity, gamers, price, id) {
    this.previewImg = previewImg;
    this.title = title;
    this.genre = genre;
    this.complexity = complexity;
    this.gamers = gamers;
    this.price = price;
    this._id = id? new mongodb.ObjectId(id) : null;
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      dbOp = db.collection('quests').updateOne({ _id: this._id }, { $set: this })
    } else {
      dbOp = db.collection('quests').insertOne(this)
    }
    return dbOp;
  }

  static fetchAll() {
    const db = getDb();
    return db.collection('quests').find().toArray()
      .then(quests => quests)
      .catch(err => console.error(err))
  }

  static findQuest(id) {
    const db = getDb();
    return db.collection('quests').find({ _id: new mongodb.ObjectId(id) }).next()
      .then(quest => quest)
      .catch(err => console.error(err))
  }

  static deleteQuest(id) {
    const db = getDb();
    return db.collection('quests').deleteOne({ _id: mongodb.ObjectId(id) });
  }
}

module.exports = Quest;
