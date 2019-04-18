const dotenv = require('dotenv');


// Load configurations from .env file
dotenv.config();

const env = process.env.NODE_ENV || 'development';
const db = {
  mongo: {
    name: process.env.MONGO_NAME || `mongo-${env}`,
    host: process.env.MONGO_HOST || '0.0.0.0',
    port: process.env.MONGO_PORT || 27017,
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
