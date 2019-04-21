const { describe, it } = require('mocha');
const { request } = require('../context');


describe('Product API responses', () => {
  it('<200> GET /products', (done) => {
    request.get('/products')
      .expect(200)
      .end(done);
  });

  it('<200> GET /products/1001', (done) => {
    request.get('/products/1001')
      .expect(200)
      .end(done);
  });
});
