/* eslint-disable no-console */
const mongoose = require('mongoose');
const { db } = require('../../configs');

class MongoDB {
  constructor() {
    this.host = db.mongo.host;
    this.port = db.mongo.port;
    this.name = db.mongo.name;
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
