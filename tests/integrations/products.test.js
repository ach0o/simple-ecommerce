const {
  describe, it,
} = require('mocha');
const { expect } = require('chai');
const should = require('chai').should();
const request = require('request');
const { config } = require('../context');


describe('Product API responses', () => {
  it('<200> GET /products', (done) => {
    request.get(`http://${config.host}:${config.port}/products`, (err, res) => {
      should.not.exist(err);
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it('<200> GET /products/1001', (done) => {
    request.get(`http://${config.host}:${config.port}/products/1001`, (err, res) => {
      should.not.exist(err);
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});
