const { ProductModel } = require('./model');

class Product {
  static getAll(options = {}) {
    return ProductModel.find(options);
  }

  static getOne(options = {}) {
    return ProductModel.findOne(options);
  }
}

module.exports = Product;
