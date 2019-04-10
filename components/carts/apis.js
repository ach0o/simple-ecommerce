const { Router } = require('express');
const UserCart = require('./cart');

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
router.post('/:productUid', (req, res, next) => {
  const { productUid } = req.params; // model id
  const { option, productId } = req.body; // mongo object id
  const quantity = parseInt(req.body.quantity, 10);
  const cartItems = req.session.carts || [];

  // Add new if cart item is not found
  let isFound = false;
  for (let i = 0; i < cartItems.length; i += 1) {
    const item = cartItems[i];
    if (item.productUid === productUid && item.option === option) {
      item.quantity += quantity;
      isFound = true;
    }
  }
  if (!isFound) {
    cartItems.push({
      productUid, productId, option, quantity,
    });
  }

  // Set cart items to session
  req.session.carts = cartItems;
  if (req.session.userId) {
    // Update cart to database when user is logged in
    UserCart.add({ userId: req.session.userId, carts: cartItems })
      .then(result => console.log(result))
      .catch(err => next(err));
  }
  res.redirect('back');
});

module.exports = router;
