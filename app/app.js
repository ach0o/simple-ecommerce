const express = require('express');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const { errorHandlers, renderHelpers } = require('./middlewares');
const { routers, databases } = require('./components');

const app = express();
databases.MongoDB.connect();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// To immediately apply changes made by admin user, like menu
app.disable('view cache');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    name: 'idssn',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(express.static(path.join(__dirname, 'public')));
app.use(renderHelpers.setLocals);
app.use('/products', routers.products);
app.use('/carts', routers.carts);
app.use('/auths', routers.auths);
app.use('/orders', routers.orders);
app.use('/admins', routers.admins);
app.use('/', routers.categories);

// handling errors
app.use(errorHandlers.NotFoundHandler);
app.use(errorHandlers.ErrorHandler);

// security
app.disable('x-powered-by');

module.exports = app;
