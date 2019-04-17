const { CategoryModel } = require('./model');

class Category {
  static getAll(options = {}, popOptions = {}) {
    return CategoryModel.find(options)
      .populate([
        { path: 'products', ...popOptions.product || {} },
        { path: 'childCategories', ...popOptions.children || {} },
      ]);
  }

  static getOne(options = {}, popOptions = {}) {
    return CategoryModel.findOne(options)
      .populate([
        { path: 'products', ...popOptions.product || {} },
        { path: 'childCategories', ...popOptions.children || {} },
      ]);
  }

  static insertOne(options = {}) {
    return CategoryModel.create(options);
  }

  static updateOne(options = {}) {
    return CategoryModel.findOneAndUpdate(
      { _id: options.id },
      { ...options.category, updated: Date.now() },
      { upsert: true, new: true },
    );
  }
  
  static removeOne(options = {}) {
    return CategoryModel.findOneAndDelete(options);
  }
}

module.exports = Category;
