const { Schema, model } = require('mongoose');

const OrderSchema = new Schema({
  userId: { type: String },
  status: {
    type: String,
    enum: ['PREP', 'SHIP', 'DELI', 'CMPT', 'CNCL'],
    default: 'PREP',
  },
  products: [{
    productUid: { type: Number },
    productId: { type: Schema.Types.ObjectId, ref: 'product' },
    option: { type: String },
    quantity: { type: Number, min: 1, max: 999 },
    productInfo: { type: Object },
  }],
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  totalPrice: { type: Number },
  payment: {
    method: String,
    paidAmount: Number,
    processed: Date,
  },
  shipment: {
    method: String,
    trackingId: String,
    shipped: Date,
  },
});

const OrderModel = model('order', OrderSchema);

module.exports = {
  OrderSchema,
  OrderModel,
};
