/* eslint-disable no-underscore-dangle */
const http = require('http');
const app = require('../../server');

// Fixture of the server instance for testing
class ServerFixture {
  constructor() {
    this._server = undefined;
  }

  connect(port, host = 'localhost') { // create and launch the server
    if (this._server) console.log('Already connected.');
    else {
      if (!port) throw new Error('port arg is missing');
      this._server = http.createServer(app);
      this._server.listen(port, host);
    }
  }

  disconnect() { // teardown the server
    this._server.close();
  }

  get() { // get the server instance
    if (this._server) return this._server;

    this.connect();
    return this.get();
  }
}

module.exports = ServerFixture;
