const { before, after } = require('mocha');
const fs = require('fs');
const path = require('path');
const config = require('../configs');
const { server } = require('./fixtures/server.fixture');

const { ProductModel } = require('../components/products/model');
const { CategoryModel } = require('../components/categories/model');


/**
 * Before and After All hooks
 */

before(() => {
  server.connect(config.port, config.host);

  // Initialize data for test
  const products = fs.readFileSync(path.join(__dirname, '/data/product.json'), 'utf8');
  const categories = fs.readFileSync(path.join(__dirname, '/data/category.json'), 'utf8');
  const options = { upsert: true };
  Promise.all([
    ProductModel.findOneAndUpdate(JSON.parse(products), options),
    CategoryModel.findOneAndUpdate(JSON.parse(categories), options),
  ]).catch(err => console.log(err));
});

after(() => {
  server.disconnect();
});

module.exports = {
  fixtures: { server },
  config,
};
