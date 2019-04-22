const {
  describe, it, before, after,
} = require('mocha');
const { agent } = require('../context');
const Category = require('../../app/components/categories/category');


before((done) => {
  agent.post('/auths/admins')
    .expect(302)
    .expect('Location', '/admins')
    .end(done);
});

after((done) => {
  agent.post('/auths/logout')
    .expect(302)
    .expect('Location', '/')
    .end(done);
});

describe('Admin API responses', () => {
  it('<200> GET /admins', (done) => {
    agent.get('/admins')
      .expect(200, done);
  });
});

describe('Admin Products API responses', () => {
  it('<200> GET /admins/products', (done) => {
    agent.get('/admins/products')
      .expect(200, done);
  });

  it('<200> GET /admins/products/form', (done) => {
    agent.get('/admins/products/form')
      .expect(200, done);
  });

  it('<302> POST /admins/products/form', (done) => {
    const form = {
      uid: '9999',
      name: 'Lorem ipsum',
      description:
         'Lorem ipsum dolor sit amet.',
      price: '12000',
      discountPrice: '10000',
      optionQty: 'Lorem:50',
      tags: 'Lorem,ipsum',
      lastWarehoused: '2019-04-22',
    };
    agent.post('/admins/products/form')
      .send(form)
      .expect('Location', '/admins/products')
      .expect(302, done);
  });

  it('<302> POST /admins/products/delete', (done) => {
    const form = { uid: 9999 };
    agent.post('/admins/products/delete')
      .send(form)
      .expect(302)
      .expect('Location', '/admins/products')
      .end(done);
  });
});

describe('Admin Category API responses', () => {
  it('<200> GET /admins/categories', (done) => {
    agent.get('/admins/categories')
      .expect(200, done);
  });

  it('<200> GET /admins/categories/form', (done) => {
    agent.get('/admins/categories/form')
      .expect(200, done);
  });

  it('<302> POST /admins/categories/form', (done) => {
    const form = {
      name: 'abc',
      uri: 'abc',
      isEnabled: 'on',
    };
    agent.post('/admins/categories/form')
      .send(form)
      .expect(302)
      .expect('Location', '/admins/categories')
      .end(done);
  });

  it('<302> POST /admins/categories/delete', (done) => {
    Category.getOne({ uri: 'abc' })
      .then((category) => {
        agent.post('/admins/categories/delete')
          .send({ _id: category.id })
          .expect(302)
          .expect('Location', '/admins/categories')
          .end(done);
      })
      .catch(err => done(err));
  });
});
