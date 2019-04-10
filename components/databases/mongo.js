/* eslint-disable no-console */
const mongoose = require('mongoose');

class MongoDB {
  constructor(dbConfig = {}) {
    this.host = process.env.DB_HOST || dbConfig.host || 'localhost';
    this.port = process.env.DB_PORT || dbConfig.port || '27017';
    this.name = process.env.DB_NAME || dbConfig.name || 'se_testdb';
    this.db = null;
  }

  connect() {
    if (this.db) { return this.db; }

    mongoose.connect(`mongodb://${this.host}:${this.port}/${this.name}`, { useNewUrlParser: true });
    this.db = mongoose.connection;
    this.db.on('error', err => console.log(`FAIL: connection error: ${err}`));
    this.db.once('open', () => console.log(`SUCCESS: DB connected to ${this.db.client.s.url}`));
    return this.db;
  }
}

module.exports = MongoDB;
