const { Router } = require('express');
const Product = require('../products/product');

/**
 * Base Path: /admins
 */
const router = Router();

/**
 * Middleware for admins router
 * - allow access for admin users only
 */
router.use((req, res, next) => {
  // if (!req.session.userId || !req.session.isAdmin) {
  //   res.redirect('/');
  // }
  res.locals.toRender.title = 'For Admins Only';
  next();
});

/**
 * Get Admin Dashboard
 */
router.get('/', (req, res) => {
  res.render('admin/index', { ...res.locals.toRender });
});

/**
 * Get Product List
 */
router.get('/products', (req, res, next) => {
  Product.getAll()
    .then((products) => {
      res.render('admin/products', { products, ...res.locals.toRender });
    })
    .catch(err => next(err));
});

module.exports = router;
