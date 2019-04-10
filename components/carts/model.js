const { Schema, model } = require('mongoose');

const UserCartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
  carts: [{
    productUid: {
      type: Number,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'product',
    },
    option: {
      type: String,
    },
    quantity: {
      type: Number,
      min: 1,
      max: 999,
    },
  }],
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

const UserCartModel = model('usercart', UserCartSchema);

module.exports = {
  UserCartSchema,
  UserCartModel,
};
