const express = require('express');
const path = require('path');
const logger = require('morgan');
const errHandlers = require('./middlewares/errorHandlers');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.render('index');
});

// handling errors
app.use(errHandlers.NotFoundHandler);
app.use(errHandlers.ErrorHandler);

module.exports = app;
