const { OrderModel } = require('./model');

class Order {
  static get(option) {
    return OrderModel.find(option);
  }

  static add(option) {
    return OrderModel.create(option);
  }
}

module.exports = Order;
