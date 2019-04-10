const { Router } = require('express');

/**
 * Base Path: /carts
 */
const router = Router();

function renderHelperMiddleware(req, res, next) {
  res.locals.toRender = {
    title: 'Carts',
    currentUrlPath: req.originalUrl,
  };
  next();
}

router.use(renderHelperMiddleware);

/**
 * Get cart list page
 */
router.get('/', (req, res, next) => {
  res.render('cart');
});

/**
 * Add a product to cart
 */
router.post('/:productId', (req, res, next) => {
  if (req.session.userId) {
    // update cart to db
  }
  const { productId } = req.params;
  const { option } = req.body;
  const quantity = parseInt(req.body.quantity, 10);

  const cartItems = req.session.carts || {};
  if (productId in cartItems && option in cartItems[productId]) {
    cartItems[productId][option] += quantity;
  } else {
    cartItems[productId] = cartItems[productId] || {};
    cartItems[productId][option] = quantity;
  }
  cartItems.total = (cartItems.total || 0) + quantity;
  req.session.carts = cartItems;
  res.redirect('back');
});

module.exports = router;
