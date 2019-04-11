const { Router } = require('express');
const Product = require('./product');

/**
 * Base Path: /products
 */
const router = Router();

function renderHelperMiddleware(req, res, next) {
  res.locals.toRender.title = 'Product';
  next();
}

router.use(renderHelperMiddleware);

/**
 * Get product list page
 */
router.get('/', (req, res, next) => {
  Product.getAll()
    .then(products => res.render(
      'index',
      { products, ...res.locals.toRender },
    ))
    .catch(err => next(err));
});

/**
 * Get product detail page
 */
router.get('/:productUid', (req, res, next) => {
  res.locals.toRender.title = 'Product Detail';
  const options = {
    uid: req.params.productUid,
  };

  // eslint-disable-next-line no-restricted-globals
  if (isNaN(options.uid)) next(new Error('Invalid parameter type'));

  Product.getOne(options)
    .then(product => res.render(
      'detail',
      { product, ...res.locals.toRender },
    ))
    .catch(err => next(err));
});

module.exports = router;
