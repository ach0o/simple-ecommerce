const { describe, it } = require('mocha');
const { expect } = require('chai');
const should = require('chai').should();
const request = require('request');
const { config } = require('../context');


describe('Category API responses', () => {
  it('<200> GET /categories', (done) => {
    request.get(`http://${config.host}:${config.port}/categories`, (err, res) => {
      should.not.exist(err);
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it('<200> GET /categories/tshirts', (done) => {
    request.get(`http://${config.host}:${config.port}/categories/tshirts`, (err, res) => {
      should.not.exist(err);
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it('<200> GET /categories/tshirts/1001', (done) => {
    request.get(`http://${config.host}:${config.port}/categories/tshirts/1001`, (err, res) => {
      should.not.exist(err);
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});
