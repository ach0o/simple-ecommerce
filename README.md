# Simple-Ecommerce

[![CircleCI](https://circleci.com/gh/achooan/simple-ecommerce/tree/master.svg?style=shield)](https://circleci.com/gh/achooan/simple-ecommerce/tree/master)

A simple, simulated e-commerce application built with ExpressJS and MongoDB

![simpleecommerce screenshot](https://github.com/achooan/simple-ecommerce/blob/master/images/screenshot.png)

## Getting Started
### Prerequisite
* Install NodeJS (checkout [here](https://nodejs.org/en/download/))
* Install MongoDB (checkout [here](https://docs.mongodb.com/manual/administration/install-community/))

### Install required dependencies
```bash
# Install required dependencies for production
$ npm install --only=production
```

### Set configuration
```
# .env file -- for development

APP_NAME=  # default: simple-ecommerce
APP_HOST=  # default: 0.0.0.0
APP_PORT=  # default: 9090

# MongoDB must be running somewhere
MONGO_URIS= # default: mongodb://0.0.0.0:27017/mongo-development
```

### Start your app
```bash
# Launch the app
$ npm start

# OR run in debug mode
$ npm run dev
```

## Development
### Install devDependencies
```bash
$ npm install --only=development
```

### Testing
```bash
$ npm run test
```

## Try it out
Try the app at http://localhost:9090

Or, checkout the [Demo](http://ec.achooan.com/)


## License
See [LICENSE](https://github.com/achooan/simple-ecommerce/blob/master/LICENSE)
