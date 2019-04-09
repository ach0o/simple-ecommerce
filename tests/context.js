const { before, after } = require('mocha');

const testConfig = require('../configs/test');
const ServerFixture = require('./fixtures/server.fixture');

/**
 * Before and After All hooks
 */
let server;
before(() => {
  server = new ServerFixture();
  server.connect(testConfig.serverPort);
});

after(() => {
  server.disconnect();
});


module.exports = {
  fixtures: {
    server,
  },
  config: testConfig,
};
