const {
  describe, it,
} = require('mocha');
const { expect } = require('chai');
const should = require('chai').should();
const Product = require('../../components/products/product');

describe('Product db access', () => {
  it('getOne(): should return any one product', () => {
    Product.getOne()
      .then((data) => {
        expect(data).to.be.an('object');
        should.exist(data);
      })
      .catch((err) => {
        should.not.exist(err);
      });
  });

  it('getAll(): should return all products', () => {
    Product.getAll()
      .then((data) => {
        expect(data).to.be.an('array');
        should.exist(data);
      })
      .catch((err) => {
        should.not.exist(err);
      });
  });
});
