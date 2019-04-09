const { ProductModel } = require('./model');

class Product {
  static getAll() {
    return ProductModel.find({});
  }

  static getOne(options = {}) {
    return ProductModel.findOne(options)
      .then(product => product)
      .catch((err) => { throw err; });
  }
}

module.exports = Product;
