const {
  describe, it,
} = require('mocha');
const { expect } = require('chai');
const should = require('chai').should();
const request = require('request');
const { config } = require('../context');

describe('Product API responses', () => {
  it('/products: should return all products', (done) => {
    request.get(`${config.host}:${config.port}/products`, (err, res) => {
      should.not.exist(err);
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it('/products/1001: should return one product of id 1001', (done) => {
    request.get(`${config.host}:${config.port}/products/1001`, (err, res) => {
      should.not.exist(err);
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});
