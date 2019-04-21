const { describe, it } = require('mocha');
const mongoose = require('mongoose');
const { request } = require('../context');


describe('Carts API responses', () => {
  it('<200> GET /carts', (done) => {
    request.get('/carts')
      .expect(200)
      .end(done);
  });

  it('<302> GET /carts/clear', (done) => {
    request.get('/carts/clear')
      .expect(302)
      .expect('Location', '/') // redirect back
      .end(done);
  });

  it('<302> POST /carts/checkout', (done) => {
    request.post('/carts/checkout')
      .expect(302)
      .expect('Location', '/orders/checkout')
      .end(done);
  });

  it('<302> POST /carts/1001', (done) => {
    const form = {
      option: 'default',
      productId: mongoose.Types.ObjectId(),
      quantity: 3,
    };
    request.post('/carts/1001')
      .send(form)
      .expect(302)
      .expect('Location', '/')
      .end(done);
  });
});
