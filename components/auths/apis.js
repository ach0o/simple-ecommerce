const { Router } = require('express');
const Cart = require('../carts/cart');

/**
 * Base Path: /auths
 */
const router = Router();

/**
 * Middleware for auths router
 * - allow access for guest users only
 * - send back or home if logged in user access this route
 */
router.use((req, res, next) => {
  if (req.session.userId) {
    res.redirect('/');
  }
  res.locals.toRender.title = 'Login';
  next();
});

/**
 * Get login page
 */
router.get('/login', (req, res) => {
  res.render('login', { ...res.locals.toRender });
});

/**
 * Post login as a user
 * - cart items stored in the session is added to user's cart
 */
router.post('/login', (req, res, next) => {
  req.session.userId = 'TestUser';

  const option = {
    userId: req.session.userId,
    carts: req.session.carts,
  };

  /**
   * Collect cart items and redirect to the last position
   * - Creates new cart for the user when no cart item is found.
   * - Set cart items to the session
   */
  Cart.get({ userId: req.session.userId })
    .then((carts) => {
      if (!carts) { Cart.add(option); }
      req.session.carts = req.session.carts || [];
      req.session.carts = req.session.carts.concat(carts);
      const redirectTo = req.session.lastPosition || '/';
      delete req.session.lastPosition;
      res.redirect(redirectTo);
    })
    .catch(err => next(err));
});

/**
 * Temporary auth for admin user
 */
router.post('/admins', (req, res) => {
  req.session.userId = 'AdminUser';
  req.session.isAdmin = true;
  res.redirect('/admins');
});

router.get('/logout', (req, res) => {
  res.locals.toRender.title = 'Logout';
  req.session.destroy();
  res.end();
});

module.exports = router;
