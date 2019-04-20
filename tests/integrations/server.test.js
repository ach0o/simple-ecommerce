const {
  describe, it,
} = require('mocha');
const request = require('request');
const { expect } = require('chai');
const should = require('chai').should();
const { config } = require('../context');

describe('Basic server responses', () => {
  it('<200> GET /', (done) => {
    request.get(`http://${config.host}:${config.port}/`, (err, res) => {
      should.not.exist(err);
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it('<404> GET /pagenotfound', (done) => {
    request.get(`http://${config.host}:${config.port}/pagenotfound`, (err, res) => {
      should.not.exist(err);
      expect(res.statusCode).to.equal(404);
      done();
    });
  });
});
