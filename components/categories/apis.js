const { Router } = require('express');
const Category = require('./category');
const Product = require('../products/product');

/**
 * Base Path: /
 */
const router = Router();

router.get('/', (req, res, next) => {
  Product.getAll()
    .sort('-lastWarehoused')
    .exec((err, products) => {
      if (err) next(err);
      res.locals.toRender.title = 'New Arrivals';
      res.locals.toRender.products = products;
      res.locals.toRender.currentUrlPath += 'categories/all';
      res.render('index', { ...res.locals.toRender });
    });
});

/**
 * Get a list of categories
 */
router.get('/categories', (req, res, next) => {
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
router.get('/categories/:categoryUri', (req, res, next) => {
  const options = { uri: req.params.categoryUri };

  Category.getOne(options)
    .then((category) => {
      res.locals.toRender.title = category.name;
      res.locals.toRender.products = category.products;
      res.render('index', { ...res.locals.toRender });
    })
    .catch(err => next(err));
});

/**
 * Get a product list under any categories
 */
router.get('/categories/all/:productUid', (req, res, next) => {
  const options = { uid: req.params.productUid };

  Product.getOne(options)
    .then((product) => {
      res.locals.toRender.title = product.name;
      res.locals.toRender.product = product;
      res.render('detail', { ...res.locals.toRender });
    })
    .catch(err => next(err));
});


/**
 * Get a product detail
 */
router.get('/categories/:categoryUri/:productUid', (req, res, next) => {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(req.params.productUid)) next(new Error('Invalid parameter type'));

  const options = { uri: req.params.categoryUri };

  // option for populate the document
  const popOptions = {
    product: {
      match: { uid: req.params.productUid },
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
