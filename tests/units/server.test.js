/* eslint-disable global-require */
/* eslint-disable no-undef */
const request = require('request');
const http = require('http');
const { expect } = require('chai');
const app = require('../../server');

// Initialize test variables
let server;
const port = 9090;
const rootUrl = `http://localhost:${port}`;


describe('Basic server responses', () => {
  before(() => {
    server = http.createServer(app);
    server.listen(port);
  });

  it('#index: should return 200', (done) => {
    request.get(`${rootUrl}/`, (err, res) => {
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

  after(() => {
    server.close();
  });
});
