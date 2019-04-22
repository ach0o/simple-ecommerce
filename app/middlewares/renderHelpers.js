
function setLocals(req, res, next) {
  try {
    res.locals.toRender = {
      currentUrlPath: req.originalUrl,
      userId: req.session.userId || 'Guest',
      cartTotal: !req.session.carts ? 0 : req.session.carts.length,
    };
    next();
  } catch (err) { next(err); }
}

module.exports = {
  setLocals,
};
