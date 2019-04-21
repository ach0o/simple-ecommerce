const { describe, it } = require('mocha');
const { request } = require('../context');


describe('Category API responses', () => {
  it('<200> GET /categories', (done) => {
    request.get('/categories')
      .expect(200)
      .end(done);
  });

  it('<200> GET /categories/tshirts', (done) => {
    request.get('/categories/tshirts')
      .expect(200)
      .end(done);
  });

  it('<200> GET /categories/tshirts/1001', (done) => {
    request.get('/categories/tshirts/1001')
      .expect(200)
      .end(done);
  });
});
