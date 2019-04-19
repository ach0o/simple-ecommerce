const {
  describe, it,
} = require('mocha');
const { expect } = require('chai');
const should = require('chai').should();
const request = require('request');
const { config } = require('../context');

describe('Category API responses', () => {
  it('/categories: should return all categories', (done) => {
    request.get(`${config.host}:${config.port}/categories`, (err, res) => {
      should.not.exist(err);
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it('/categories/tshirts: should return all products of tshirts', (done) => {
    request.get(`${config.host}:${config.port}/categories/tshirts`, (err, res) => {
      should.not.exist(err);
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it('/categories/tshirts/1001: should return a product with id 1001 which is under tshirts category', (done) => {
    request.get(`${config.host}:${config.port}/categories/tshirts/1001`, (err, res) => {
      should.not.exist(err);
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});
