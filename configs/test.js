/**
 * Default test config
 */
let port = 9090;
let host = 'localhost';

if (process.env.NODE_ENV === 'test') {
  port = process.env.PORT;
  host = process.env.HOST;
}

module.exports = {
  serverPort: port,
  serverHost: host,
  serverUrl: `http://${host}:${port}`,
};
