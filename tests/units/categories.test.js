const {
  describe, it,
} = require('mocha');
const { expect } = require('chai');
const should = require('chai').should();
const Category = require('../../app/components/categories/category');

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
