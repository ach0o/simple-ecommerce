const {
  describe, it,
} = require('mocha');
const request = require('request');
const { expect } = require('chai');
const { config } = require('../context');

// Initialize test variables
const rootUrl = `http://${config.serverHost}:${config.serverPort}`;

describe('Basic server responses', () => {
  it('#index: should return 200', (done) => {
    request.get(`${rootUrl}/`, (err, res) => {
      if (err) console.log(err);

      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it('#error: should return 404', (done) => {
    request.get(`${rootUrl}/pagethatdoesntexist`, (err, res) => {
      expect(res.statusCode).to.equal(404);
      done();
    });
  });
});
