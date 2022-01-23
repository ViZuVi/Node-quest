const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class User {
  constructor(name, email, cart, id) {
    this.name = name;
    this.email = email;
    this.cart = cart;
    this._id = id ? mongodb.ObjectId(id) : null;
  }

  save() {
    const db = getDb();
    let dbOp;

    if (this._id) {
      dbOp = db.collection('users').updateOne({ _id: this._id }, { $set: this })
    } else {
      dbOp = db.collection('users').insertOne(this)
    }
    return dbOp;
  }

  addToCart(quest) {
    const cartQuestIndex = this.cart.items.findIndex(item => item.questId.toString() === quest._id.toString());
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartQuestIndex !== -1) {
      newQuantity = this.cart.items[cartQuestIndex].quantity + 1;
      updatedCartItems[cartQuestIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        questId: mongodb.ObjectId(quest._id),
        quantity: newQuantity,
      })
    }

    const updatedCart = {
      items: updatedCartItems,
    }

    const db = getDb();
    return db.collection('users').updateOne({ _id: this._id }, { $set: { cart: updatedCart } });
  }

  getCart() {
    const db = getDb();
    const questIds = this.cart.items.map(item => item.questId);
    return db.collection('quests').find({ _id: { $in: questIds } }).toArray()
      .then(quests => quests.map(quest => ({ ...quest, quantity: this.cart.items.find(x => x.questId.toString() === quest._id.toString()).quantity })))
      .catch(err => console.error(err))
  }

  deleteItemFromCart(questId) {
    const updatedCartItems = this.cart.items.filter(item => item.questId.toString() !== questId.toString());
    const db = getDb();
    return db.collection('users').updateOne({ _id: this._id }, { $set: { cart: { items: updatedCartItems } } });
  }

  addOrder() {
    const db = getDb();
    return this.getCart()
      .then(quests => {
        const order = {
          items: quests,
          user: {
            _id: this._id,
            name: this.name,
          },
          date: new Date(), 
        }
        return db.collection('orders').insertOne(order);
      })
      .then(() => {
        this.cart = { items: [] };
        return db.collection('users').updateOne({ _id: this._id }, { $set: { cart: { items: [] } } })
      })
  }

  getOrders() {
    const db = getDb();
    return db.collection('orders').find({ 'user._id': this._id })
      .toArray()
      .then(orders => orders.map(item => ({...item, date: `${item.date.getFullYear()}-${item.date.getMonth() + 1}-${item.date.getDate()}`})))
  }

  static findUser(id) {
    const db = getDb();
    return db.collection('users').findOne({ _id: mongodb.ObjectId(id) });
  }
}

module.exports = User;
