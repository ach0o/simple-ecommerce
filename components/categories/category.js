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
}

module.exports = Category;
