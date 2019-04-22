const { Schema, model } = require('mongoose');

const CategorySchema = new Schema({
  name: { type: String, unique: true },
  uri: {
    type: String,
    lowercase: true,
    set: v => v.replace(/\s|\//g, ''),
    unique: true,
  },
  childCategories: [{ type: Schema.Types.ObjectId, ref: 'category' }],
  products: [{ type: Schema.Types.ObjectId, ref: 'product' }],
  isEnabled: { type: Boolean, default: true },
  isParent: { type: Boolean, default: true },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

const CategoryModel = model('category', CategorySchema);

module.exports = {
  CategoryModel,
  CategorySchema,
};
