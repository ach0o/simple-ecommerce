/* eslint-disable no-undef */
const should = require('chai').should();
const { MongoDB } = require('../../components/database');


describe('Database connection', () => {
  it('should exist', () => {
    const mongo = new MongoDB();
    const conn = mongo.connect();
    should.exist(conn);
    // TODO: Catch failed to connect to server: MongoNetworkError
  });
});
