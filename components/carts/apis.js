const { Router } = require('express');
const UserCart = require('./cart');
const Product = require('./../products/product');

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

// Helper function to set required data from db
function fillCartItem(item) {
  return new Promise((resolve, reject) => {
    Product.getOne({ _id: item.productId })
      .then((product) => {
        item.name = product.name;
        item.image = product.images[0];
        item.price = product.discountPrice;
        item.isSoldOut = product.isSoldOut;
        return resolve(item);
      })
      .catch(err => reject(err));
  });
}

/**
 * Get cart list page
 */
router.get('/', (req, res, next) => {
  if (!req.session.carts || req.session.carts.length === 0) {
    res.render('cart', { ...res.locals.toRender });
    return;
  }

  if (req.session.userId) {
    const option = { userId: req.session.userId };
    UserCart.get(option)
      .then((userCart) => {
        if (userCart) { req.session.carts = userCart.carts; }
      })
      .catch(err => next(err));
  }

  const fetchProductInfo = [];
  for (let i = 0; i < req.session.carts.length; i += 1) {
    const item = req.session.carts[i];
    fetchProductInfo.push(fillCartItem(item));
  }
  Promise.all(fetchProductInfo)
    .then((cartItems) => {
      res.render('cart', { cartItems, ...res.locals.toRender });
    })
    .catch(err => next(err));
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

router.get('/clear', (req, res, next) => {
  // Empty cart items
  req.session.carts = [];

  if (req.session.userId) {
    UserCart.remove({ userId: req.session.userId })
      .then(res.redirect('back'))
      .catch(err => next(err));
  } else {
    res.redirect('back');
  }
});

module.exports = router;
