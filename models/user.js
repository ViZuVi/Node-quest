const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        questId: {
          type: Schema.Types.ObjectId,
          ref: 'Quest',
          required: true,
        },
        price: {
          type: Number,
          ref: 'Quest',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        }
      }
    ],
    total: {
      type: Number,
      required: true,
    }
  }
})

userSchema.methods.addToCart = function (quest) {
  const cartQuestIndex = this.cart.items.findIndex(item => item.questId.toString() === quest._id.toString());
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartQuestIndex !== -1) {
    newQuantity = this.cart.items[cartQuestIndex].quantity + 1;
    updatedCartItems[cartQuestIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      price: quest.price,
      questId: quest._id,
      quantity: newQuantity,
    })
  }

  const total = updatedCartItems.reduce((acc, curr) => { return acc + curr.price * curr.quantity }, 0)
  const updatedCart = {
    items: updatedCartItems,
    total,
  }
  this.cart = updatedCart;

  return this.save();
}

userSchema.methods.deleteItemFromCart = function (questId) {
  const updatedCartItems = this.cart.items.filter(item => item.questId.toString() !== questId.toString());
  this.cart.items = updatedCartItems;
  this.cart.total = updatedCartItems.reduce((acc, curr) => { return acc + curr.price * curr.quantity }, 0);
  return this.save();
}

userSchema.methods.clearCart = function () {
  this.cart = {
    items: [],
    total: 0,
  }
  return this.save();
}


module.exports = mongoose.model('User', userSchema);
