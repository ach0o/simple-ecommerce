const { ProductModel } = require('./model');

class Product {
  static getAll(options = {}) {
    return ProductModel.find(options);
  }

  static getOne(options = {}) {
    return ProductModel.findOne(options);
  }

  static saveOne(options = {}) {
    return ProductModel.findOneAndUpdate(
      { uid: options.uid },
      { ...options.product, updated: Date.now() },
      { upsert: true, new: true },
    );
  }
}

module.exports = Product;
