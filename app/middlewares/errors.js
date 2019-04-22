const createError = require('http-errors');

function NotFoundHandler(req, res, next) {
  next(createError(404));
}

// eslint-disable-next-line no-unused-vars
function ErrorHandler(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error', { err });
}

module.exports = {
  NotFoundHandler,
  ErrorHandler,
};
