const {
  describe, it,
} = require('mocha');
const request = require('request');
const { expect } = require('chai');
const should = require('chai').should();
const { config } = require('../context');

describe('Basic server responses', () => {
  it('/: should return 200', (done) => {
    request.get(`${config.serverUrl}/`, (err, res) => {
      should.not.exist(err);
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it('/pagenotfound: should return 404', (done) => {
    request.get(`${config.serverUrl}/pagenotfound`, (err, res) => {
      should.not.exist(err);
      expect(res.statusCode).to.equal(404);
      done();
    });
  });
});
