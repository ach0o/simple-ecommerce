const { ProductModel } = require('./model');

class Product {
  static getAll() {
    return ProductModel.find({});
  }

  static getOne(options = {}) {
    return ProductModel.findOne(options);
  }
}

module.exports = Product;
