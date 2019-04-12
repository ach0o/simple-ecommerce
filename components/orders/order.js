const { OrderModel } = require('./model');

class Order {
  static get(option) {
    return OrderModel.find(option);
  }

  static add(order) {
    return OrderModel.create(order);
  }
}

module.exports = Order;
