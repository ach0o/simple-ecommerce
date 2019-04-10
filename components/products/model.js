const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
  uid: { type: Number, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  discountPrice: { type: Number, default: undefined },
  isSoldOut: { type: Boolean, default: false },
  optionQty: {
    type: Object,
    default: { default: 999 },
  },
  tags: Array,
  images: Array,
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  lastWarehoused: { type: Date },
});

const ProductModel = model('product', ProductSchema);

module.exports = {
  ProductSchema,
  ProductModel,
};
