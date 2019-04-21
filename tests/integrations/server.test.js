const { describe, it } = require('mocha');
const { request } = require('../context');


describe('Basic server responses', () => {
  it('<200> GET /', (done) => {
    request.get('/')
      .expect(200)
      .end(done);
  });

  it('<404> GET /pagenotfound', (done) => {
    request.get('/pagenotfound')
      .expect(404)
      .end(done);
  });
});
