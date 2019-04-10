const {
  describe, it,
} = require('mocha');
const { expect } = require('chai');
const should = require('chai').should();
const request = require('request');
const Category = require('../../components/categories/category');
const { config } = require('../context');

describe('Category db access', () => {
  it('getOne(): should return any one category', () => {
    Category.getOne()
      .then((data) => {
        expect(data).to.be.an('object');
        should.exist(data);
      })
      .catch((err) => {
        should.not.exist(err);
      });
  });

  it('getAll(): should return all categories', () => {
    Category.getAll()
      .then((data) => {
        expect(data).to.be.an('array');
        should.exist(data);
      })
      .catch((err) => {
        should.not.exist(err);
      });
  });
});

describe('Category API responses', () => {
  it('/categories: should return all categories', (done) => {
    request.get(`${config.serverUrl}/categories`, (err, res) => {
      should.not.exist(err);
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it('/categories/tshirts: should return all products of tshirts', (done) => {
    request.get(`${config.serverUrl}/categories/tshirts`, (err, res) => {
      should.not.exist(err);
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it('/categories/tshirts/1001: should return a product with id 1001 which is under tshirts category', (done) => {
    request.get(`${config.serverUrl}/categories/tshirts/1001`, (err, res) => {
      should.not.exist(err);
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});
