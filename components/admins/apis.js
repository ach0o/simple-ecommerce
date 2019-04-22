const { Router } = require('express');
const multer = require('multer');
const Product = require('../products/product');
const Category = require('../categories/category');
const Order = require('../orders/order');
const fileUtil = require('../../utils/fileUtil');

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
  if (!req.session.userId || !req.session.isAdmin) {
    res.redirect('/');
  }
  res.locals.toRender.title = 'For Admins Only';
  next();
});

/**
 * Get Admin Dashboard
 */
router.get('/', (req, res, next) => {
  Order.get({})
    .then((orders) => {
      res.render('admin/index', { orders, ...res.locals.toRender });
    })
    .catch(err => next(err));
});

/**
 *
 * ADMIN ORDERS APIS
 *
 */

/**
 * Post update order status
 */
router.post('/orders/:orderId/:status', (req, res, next) => {
  const { orderId, status } = req.params;
  const statusEnum = ['PREP', 'SHIP', 'DELI', 'CMPT', 'CNCL'];

  if (statusEnum.indexOf(status) !== -1) {
    Order.updateStatus(orderId, status)
      .then(() => {
        res.redirect('/admins');
      })
      .catch(err => next(err));
  } else {
    res.send("Invalid status: 'PREP', 'SHIP', 'DELI', 'CMPT', 'CNCL'").statusCode(400);
  }
});

/**
 *
 * ADMIN PRODUCTS APIS
 *
 */

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

  /**
   * Reformat isSoldOut
   * - "on" to true
   */
  data.isSoldOut = data.isSoldOut === 'on';

  Product.saveOne({ uid: data.uid, product: data })
    .then(() => {
      res.redirect('/admins/products');
    })
    .catch(err => next(err));
});

router.post('/products/delete', upload.none(), (req, res, next) => {
  const { uid } = req.body;
  Product.removeOne({ uid })
    .then((product) => {
      // Delete image files
      for (let i = 0; i < product.images.length; i += 1) {
        fileUtil.deleteImgFile(product.images[i]);
      }
      res.redirect('/admins/products');
    })
    .catch(err => next(err));
});


/**
 *
 * ADMIN CATEGORIES APIS
 *
 */

/**
 * Get Category List
 */
router.get('/categories', (req, res, next) => {
  Category.getAll()
    .then((categories) => {
      res.render('admin/categories', { categories, ...res.locals.toRender });
    })
    .catch(err => next(err));
});

/**
 * Get Category Form
 * Add new category when no query param is given.
 * Edit the current category when `uri` query param is given.
 */
router.get('/categories/form', (req, res, next) => {
  const { uri } = req.query;
  /**
   * If parent, show all non-parent categories, all products
   * If child, show no categories, parent's products
   */
  const fetchCateAndProducts = [];
  // fetchCateAndProducts.push(Category.getAll({ uri: { $ne: uri }, isParent: false }));
  fetchCateAndProducts.push(Product.getAll());
  if (uri) {
    Category.getOne({ uri })
      .then((category) => {
        Promise.all(fetchCateAndProducts)
          .then((result) => {
            // const allCategories = result[0];
            const allProducts = result[0];
            res.render('admin/categoryForm', {
              // category, allCategories, allProducts, ...res.locals.toRender,
              category, allProducts, ...res.locals.toRender,
            });
          });
      })
      .catch(err => next(err));
  } else {
    Promise.all(fetchCateAndProducts)
      .then((result) => {
        // const allCategories = result[0];
        const allProducts = result[0];
        res.render('admin/categoryForm', {
          // allCategories, allProducts, ...res.locals.toRender,
          allProducts, ...res.locals.toRender,
        });
      })
      .catch(err => next(err));
    // res.render('admin/categoryForm', { ...res.locals.toRender });
  }
});

/**
 * Post Category Form
 */
router.post('/categories/form', (req, res, next) => {
  const { id, ...data } = req.body;
  /**
   * Save Category with database id
   * - if the id exists, update the category.
   * - otherwise, create new category
   */

  /**
   * Reformat products
   * - set to empty array when user doesn't set any products
   */
  data.products = data.products ? data.products : [];

  /**
   * Reformat isEnabled
   * - "on" to true
   */
  data.isEnabled = data.isEnabled === 'on';

  const saveMethod = id
    ? Category.updateOne({ id, category: data })
    : Category.insertOne(data);

  saveMethod
    .then(() => Category.getAll({ isEnabled: true }))
    .then((categories) => {
      fileUtil.createMenuFile(categories);
      res.redirect('/admins/categories');
    })
    .catch(err => next(err));
});

router.post('/categories/delete', (req, res, next) => {
  const { id } = req.body;
  Category.removeOne({ _id: id })
    .then(() => Category.getAll({ isEnabled: true }))
    .then((categories) => {
      fileUtil.createMenuFile(categories);
      res.redirect('/admins/categories');
    })
    .catch(err => next(err));
});

module.exports = router;
