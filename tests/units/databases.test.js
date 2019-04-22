const { describe, it } = require('mocha');
const should = require('chai').should();
const { databases } = require('../../components');


describe('Database connection', () => {
  it('should exist', () => {
    const mongo = databases.MongoDB;
    const conn = mongo.connect();
    should.exist(conn);
    // TODO: Catch failed to connect to server: MongoNetworkError
  });
});
