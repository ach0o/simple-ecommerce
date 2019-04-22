const { before, after } = require('mocha');
const fs = require('fs');
const path = require('path');
const request = require('supertest');

const config = require('../app/configs');
const app = require('../app/app');
const { ProductModel } = require('../app/components/products/model');
const { CategoryModel } = require('../app/components/categories/model');
const { databases } = require('../app/components');


/**
 * Before and After All hooks
 */

before(() => {
  // Initialize data for test
  const products = fs.readFileSync(path.join(__dirname, '/data/product.json'), 'utf8');
  const categories = fs.readFileSync(path.join(__dirname, '/data/category.json'), 'utf8');
  const options = { upsert: true };

  Promise.all([
    ProductModel.insertMany(JSON.parse(products), options),
    CategoryModel.insertMany(JSON.parse(categories), options),
  ])
    .then(() => console.log('initialized test data...'))
    .catch(err => console.log(err));
});

after(() => {
  console.log('dropping database..');
  databases.MongoDB.db.dropDatabase();
});

module.exports = {
  config,
  request: request(app),
  agent: request.agent(app),
};
