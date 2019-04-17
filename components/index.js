const products = require('./products');
const carts = require('./carts');
const categories = require('./categories');
const databases = require('./databases');
const auths = require('./auths');
const orders = require('./orders');

module.exports = {
  routers: {
    products,
    categories,
    carts,
    auths,
    orders,
  },
  databases,
};
