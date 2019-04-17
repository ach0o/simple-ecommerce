const { Router } = require('express');
const multer = require('multer');
const Product = require('../products/product');

const upload = multer({ dest: './public/images/' });

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

/**
 * Get Product Form
 * Add new product when no query param is given.
 * Edit the current product when `uid` query param is given.
 */
router.get('/products/form', (req, res, next) => {
  const { uid } = req.query;
  if (uid) {
    Product.getOne({ uid })
      .then((product) => {
        const { optionQty } = product;
        const formattedOptionQty = [];
        Object.keys(optionQty).forEach((key) => {
          formattedOptionQty.push(`${key}:${optionQty[key]}`);
        });
        product.optionQty = formattedOptionQty;
        res.render('admin/productForm', { product, ...res.locals.toRender });
      })
      .catch(err => next(err));
  } else {
    res.render('admin/productForm', { ...res.locals.toRender });
  }
});

/**
 * Post Product Form
 * Save and update with the data sent from the form
 */
router.post('/products/form', upload.single('images'), (req, res, next) => {
  const data = req.body;

  /**
   * Reformat options
   * - input: "option1:quantity1,option2:quantity2, ..."
   * - format to: { option1: quantity1, option2: quantity2, ... }
   */
  data.optionQty = data.optionQty.split(',');
  const reformatOptionQty = Object.assign(...data.optionQty.map((elem) => {
    const keyVal = elem.split(':');
    return { [keyVal[0]]: parseInt(keyVal[1], 10) };
  }));
  data.optionQty = reformatOptionQty;

  /**
   * Reformat tags
   * - input: "tag1,tag2, ..."
   * - format to: ["tag1", "tag2", ...]
   */
  data.tags = data.tags.split(',');

  /**
   * Reformat images
   * - actual image is saved at public/images
   */
  if (req.file) {
    data.images = [req.file.filename];
  }

  Product.saveOne({ uid: data.uid, product: data })
    .then(() => {
      res.redirect('/admins/products');
    })
    .catch(err => next(err));
});

module.exports = router;
