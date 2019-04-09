const express = require('express');
const path = require('path');
const logger = require('morgan');
const { errorHandlers } = require('./middlewares');
const { routers, databases } = require('./components');

const app = express();
const mongo = new databases.MongoDB({ name: 'se_debugDb' });
mongo.connect();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/products', routers.products);
app.get('/', (req, res) => {
  res.render('index');
});

// handling errors
app.use(errorHandlers.NotFoundHandler);
app.use(errorHandlers.ErrorHandler);

module.exports = app;
