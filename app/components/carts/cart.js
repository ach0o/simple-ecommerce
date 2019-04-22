/* eslint-disable object-curly-newline */
const { CartModel } = require('./model');

class Cart {
  /**
   * Add a user's cart
   * This automatically updates the cart if the user's cart already exists.
   * @param {object} option
   */
  static add(option) {
    return CartModel.findOneAndUpdate(
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
      CartModel.findOne({ userId: options.userId })
        .populate({ path: 'carts.productId', model: 'product' })
        .then((cart) => {
          let savedCarts = [];
          if (cart) {
            savedCarts = cart.carts.map((item) => {
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
    return CartModel.deleteOne(option);
  }
}

module.exports = Cart;
