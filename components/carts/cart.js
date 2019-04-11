const { UserCartModel } = require('./model');

class UserCart {
  static add(option) {
    return UserCartModel.findOneAndUpdate(
      { userId: option.userId },
      { carts: option.carts },
      { upsert: true, new: true },
    );
  }

  static get(option) {
    return UserCartModel.findOne({ userId: option.userId });
  }

  static remove(option = {}) {
    return UserCartModel.deleteOne(option);
  }
}

module.exports = UserCart;
