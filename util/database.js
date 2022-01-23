const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = cb => {
  MongoClient.connect('mongodb+srv://zu:150518@cluster0.tchws.mongodb.net/nodeQuest?retryWrites=true&w=majority')
    .then((client) => {
      _db = client.db();
      console.log('Connected!');
      cb();
    })
    .catch((err) => console.error(err))
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

