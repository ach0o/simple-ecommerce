const testConfig = require('../configs/test');
const ServerFixture = require('./fixtures/server.fixture');

module.exports = {
  fixtures: {
    server: new ServerFixture(),
  },
  config: testConfig,
};
