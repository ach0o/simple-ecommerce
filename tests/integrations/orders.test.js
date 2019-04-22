const { describe, it } = require('mocha');
const mongoose = require('mongoose');
const { agent } = require('../context');


function withAuth(fn) {
  agent.post('/auths/login')
    .expect(302)
    .expect('Location', '/')
    .end(fn);
}

function withoutAuth(fn) {
  agent.get('/auths/logout')
    .expect(302)
    .expect('Location', '/')
    .end(fn);
}

describe('Orders API responses', () => {
  it('<200> GET /orders', (done) => {
    withAuth(() => {
      agent.get('/orders')
        .expect(200, done);
    });
  });

  it('<302> GET /orders', (done) => {
    withoutAuth(() => {
      agent.get('/orders')
        .expect(302, done);
    });
  });

  it('<302> GET /orders/checkout', (done) => {
    withAuth(() => {
      agent.get('/orders/checkout')
        .expect('Location', '/carts')
        .expect(302, done);
    });
  });

  it('<200> [TODO] POST /orders/checkout', (done) => {
    // TODO
    done();
  });

  it('<302> POST /orders/checkout', (done) => {
    const form = {
      payment: 'credit-card',
      shipment: 'domestic',
    };
    withAuth(() => {
      agent.post('/orders/checkout')
        .send(form)
        .expect(302)
        .expect('Location', '/orders') // redirect to /orders
        .end(done);
    });
  });

  it('<200> POST /orders/1001', (done) => {
    const form = {
      option: 'default',
      productId: mongoose.Types.ObjectId(),
      price: 20000,
      quantity: 3,
    };
    withAuth(() => {
      agent.post('/orders/1001')
        .send(form)
        .expect(200, done);
    });
  });
});
