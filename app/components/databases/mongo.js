/* eslint-disable no-console */
const mongoose = require('mongoose');
const { db } = require('../../configs');

class MongoDB {
  constructor() {
    this.uris = db.mongo.uris;
    this.db = null;
  }

  connect() {
    if (this.db) { return this.db; }

    mongoose.connect(this.uris, { useNewUrlParser: true });
    this.db = mongoose.connection;
    this.db.on('error', err => console.log(`FAIL: connection error: ${err}`));
    this.db.once('open', () => console.log(`SUCCESS: DB connected to ${this.db.client.s.url}`));
    return this.db;
  }
}

module.exports = new MongoDB();
