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
// sample Product
const p1 = [
  {
    uid: 1001,
    name: 'product number one',
    description: 'a description of this product. this is not fun',
    price: 12000,
    discountPrice: 12000,
    optionQty: {
      default: 999,
      red: 100,
      blue: 40,
    },
    images: ['product1.png'],
    tags: ['product', 'number', 'one'],
    lastWarehoused: new Date(),
  },
  {
    uid: 1002,
    name: 'product number two',
    description: 'a description of this product. this is not fun',
    price: 12000,
    discountPrice: 10000,
    optionQty: {
      default: 999,
      red: 100,
      blue: 40,
    },
    images: ['product2.png'],
    tags: ['product', 'number', 'two'],
    lastWarehoused: new Date(),
  },
  {
    uid: 1003,
    name: 'product number three',
    description: 'a description of this product. this is not fun',
    price: 12000,
    discountPrice: 9000,
    optionQty: {
      default: 999,
      red: 100,
      blue: 40,
    },
    images: ['product3.png'],
    tags: ['product', 'number', 'three'],
    lastWarehoused: new Date(),
  },
];
ProductModel.insertMany(p1, (err, docs) => {
  console.log('three p added.');
});

module.exports = {
  ProductSchema,
  ProductModel,
};
