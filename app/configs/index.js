const dotenv = require('dotenv');


// Load configurations from .env file
dotenv.config();

const env = process.env.NODE_ENV || 'development';
const db = {
  mongo: {
    uris: process.env.MONGO_URIS || `mongodb://0.0.0.0:27017/mongo-${env}`
  },
};

const configs = {
  base: {
    env,
    db,
    name: process.env.APP_NAME || 'simple-ecommerce',
    host: process.env.APP_HOST || '0.0.0.0',
    port: 9090,
  },
  production: {
    port: process.env.APP_PORT || 9091,
  },
  development: {
  },
  test: {
    port: 9092,
  },
};
const config = Object.assign(configs.base, configs[env]);

module.exports = config;
