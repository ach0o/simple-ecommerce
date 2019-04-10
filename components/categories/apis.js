const { Router } = require('express');
const Category = require('./category');

/**
 * Base Path: /categories
 */
const router = Router();

function renderHelperMiddleware(req, res, next) {
  res.locals.toRender = {
    title: 'Categories',
    currentUrlPath: req.originalUrl,
  };
  next();
}

router.use(renderHelperMiddleware);

/**
 * Get a list of categories
 */
router.get('/', (req, res, next) => {
  const options = {
    isEnabled: true,
    isParent: true,
  };

  Category.getAll(options)
    .then(categories => res.render(
      'categories',
      { categories, ...res.locals.toRender },
    ))
    .catch(err => next(err));
});

/**
 * Get a product list under the category
 */
router.get('/:categoryUri', (req, res, next) => {
  res.locals.toRender.title = 'Product Detail';

  const options = { uri: req.params.categoryUri };

  Category.getOne(options)
    .then((category) => {
      res.locals.toRender.title = category.name;
      res.render(
        'products',
        { products: category.products, ...res.locals.toRender },
      );
    })
    .catch(err => next(err));
});

/**
 * Get a product detail
 */
router.get('/:categoryUri/:productId', (req, res, next) => {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(req.params.productId)) next(new Error('Invalid parameter type'));

  const options = { uri: req.params.categoryUri };

  // option for populate the document
  const popOptions = {
    product: {
      match: { uid: req.params.productId },
    },
  };

  Category.getOne(options, popOptions)
    .then((category) => {
      res.locals.toRender.title = category.name;
      res.render('detail', {
        product: category.products[0],
        ...res.locals.toRender,
      });
    })
    .catch(err => next(err));
});

module.exports = router;
