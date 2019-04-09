const express = require('express');
const path = require('path');
const logger = require('morgan');
const { MongoDB } = require('./components/database');
const errHandlers = require('./middlewares/errorHandlers');

const { productRouter } = require('./components/products');

const app = express();
const mongo = new MongoDB({ name: 'se_debugDb' });
mongo.connect();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/products', productRouter);
app.get('/', (req, res) => {
  res.render('index');
});


// handling errors
app.use(errHandlers.NotFoundHandler);
app.use(errHandlers.ErrorHandler);

module.exports = app;
