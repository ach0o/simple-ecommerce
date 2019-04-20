const { describe, it } = require('mocha');
const { expect } = require('chai');
const should = require('chai').should();
const request = require('request');
const { config } = require('../context');


describe('Carts API responses', () => {
  it('<200> GET /carts', (done) => {
    request.get(`http://${config.host}:${config.port}/carts`, (err, res) => {
      should.not.exist(err);
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it('<302> GET /carts/clear', (done) => {
    request.post(`http://${config.host}:${config.port}/carts/clear`, (err, res) => {
      should.not.exist(err);
      expect(res.statusCode).to.equal(302); // redirect to /orders/checkout
      done();
    });
  });

  it('<302> POST /carts/checkout', (done) => {
    request.post(`http://${config.host}:${config.port}/carts/checkout`, (err, res) => {
      should.not.exist(err);
      expect(res.statusCode).to.equal(302); // redirect to /orders/checkout
      done();
    });
  });

  it('<302> POST /carts/1001', (done) => {
    const mongoose = require('mongoose');
    const form = {
      option: 'default',
      productId: mongoose.Types.ObjectId(),
      quantity: 3,
    };
    request.post(
      `http://${config.host}:${config.port}/carts/1001`,
      form,
      (err, res) => {
        should.not.exist(err);
        expect(res.statusCode).to.equal(302); // redirects back
        done();
      },
    );
  });
});
