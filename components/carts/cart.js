/* eslint-disable object-curly-newline */
const { UserCartModel } = require('./model');

class UserCart {
  /**
   * Add a user's cart
   * This automatically updates the cart if the user's cart already exists.
   * @param {object} option
   */
  static add(option) {
    return UserCartModel.findOneAndUpdate(
      { userId: option.userId },
      { carts: option.carts },
      { upsert: true, new: true },
    );
  }

  /**
   * Get cart items with populated product data
   * @param {object} options
   */
  static get(options) {
    return new Promise((resolve, reject) => {
      UserCartModel.findOne({ userId: options.userId })
        .populate({ path: 'carts.productId', model: 'product' })
        .then((userCart) => {
          let savedCarts = [];
          if (userCart) {
            savedCarts = userCart.carts.map((item) => {
              const { productId, productUid, option, quantity } = item;
              const productInfo = productId; // populated by product model

              return {
                productUid,
                option,
                quantity,
                productInfo,
                productId: productInfo.id,
              };
            });
          }
          resolve(savedCarts);
        })
        .catch(err => reject(err));
    });
  }

  static remove(option = {}) {
    return UserCartModel.deleteOne(option);
  }
}

module.exports = UserCart;
