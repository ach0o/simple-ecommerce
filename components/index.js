const products = require('./products');
const carts = require('./carts');
const categories = require('./categories');
const databases = require('./databases');
// require('./tempAddData');

module.exports = {
  routers: {
    products,
    categories,
    carts,
  },
  databases,
};
