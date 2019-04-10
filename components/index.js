const products = require('./products');
const categories = require('./categories');
const databases = require('./database');
// require('./tempAddData');

module.exports = {
  routers: {
    products,
    categories,
  },
  databases,
};
