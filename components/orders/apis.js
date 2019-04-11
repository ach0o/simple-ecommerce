const { Router } = require('express');
const Order = require('./order');


/**
 * Base Path: /orders
 *  Login Required.
 */
const router = Router();

function renderHelperMiddleware(req, res, next) {
  res.locals.toRender.title = 'Orders';
  next();
}

function requireAuthorization(req, res, next) {
  if (!req.session.userId) {
    res.redirect('/auths/login');
  }
  next();
}

router.use(requireAuthorization);
router.use(renderHelperMiddleware);

/**
 * Get user's order list
 */
router.get('/', (req, res, next) => {
  Order.get({ userId: req.session.userId })
    .then((orders) => {
      res.render('orders', { orders, ...res.locals.toRender });
    })
    .catch(err => next(err));
});


module.exports = router;
