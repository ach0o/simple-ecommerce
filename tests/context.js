const { before, after } = require('mocha');

const config = require('../configs');
const ServerFixture = require('./fixtures/server.fixture');

/**
 * Before and After All hooks
 */
let server;
before(() => {
  server = new ServerFixture();
  server.connect(config.port);
});

after(() => {
  server.disconnect();
});

module.exports = {
  fixtures: { server },
  config,
};
