const http = require('http');
const app = require('../../server');

// Fixture of the server instance for testing
class ServerFixture {
  constructor() {
    this.server = undefined;
  }

  connect(port, host = 'localhost') { // create and launch the server
    if (this.server) console.log('Already connected.');
    else {
      this.server = http.createServer(app);
      this.server.listen(port, host);
    }
  }

  close() { // teardown the server
    this.server.close();
    this.server = undefined;
  }

  get() { // get the server instance
    if (this.server) return this.server;

    this.connect();
    return this.get();
  }
}

module.exports = ServerFixture;
