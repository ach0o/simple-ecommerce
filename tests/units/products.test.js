const {
  describe, it,
} = require('mocha');
const { expect } = require('chai');
const should = require('chai').should();
const request = require('request');
const Product = require('../../components/products/product');
const { config } = require('../context');

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

describe('Product API responses', () => {
  it('/products: should return all products', (done) => {
    request.get(`${config.serverUrl}/products`, (err, res) => {
      should.not.exist(err);
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it('/products/1001: should return one product of id 1001', (done) => {
    request.get(`${config.serverUrl}/products/1001`, (err, res) => {
      should.not.exist(err);
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});
