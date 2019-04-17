const { Schema, model } = require('mongoose');

const CartSchema = new Schema({
  userId: { type: String },
  carts: [{
    productUid: { type: Number },
    productId: { type: Schema.Types.ObjectId, ref: 'product' },
    option: { type: String },
    quantity: { type: Number, min: 1, max: 999 },
  }],
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

const CartModel = model('cart', CartSchema);

module.exports = {
  CartSchema,
  CartModel,
};
