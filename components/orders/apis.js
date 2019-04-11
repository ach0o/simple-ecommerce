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
    req.session.lastPosition = req.originalUrl;
    res.redirect('/auths/login');
  } else {
    next();
  }
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

/**
 * Redirect to product page
 */
router.get('/:productUid', (req, res, next) => {
  res.redirect(`/categories/all/${req.params.productUid}`);
});

/**
 * Post direct order
 */
router.post('/:productUid', (req, res, next) => {
  const { productUid } = req.params;
  const quantity = parseInt(req.body.quantity, 10);
  const order = { productUid, quantity, ...req.body };
  res.render('payment', { orders: [order], ...res.locals.toRender });
});


module.exports = router;
