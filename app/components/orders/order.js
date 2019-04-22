const { OrderModel } = require('./model');

class Order {
  static get(options) {
    return OrderModel.find(options);
  }

  static add(order) {
    return OrderModel.create(order);
  }

  static updateStatus(id, status) {
    return OrderModel.findOneAndUpdate(
      { _id: id },
      { status, updated: Date.now() },
    );
  }
}

module.exports = Order;
