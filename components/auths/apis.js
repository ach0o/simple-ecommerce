const { Router } = require('express');
const UserCart = require('../carts/cart');

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

  if (req.session.carts) {
    const option = {
      userId: 'TestUser',
      carts: req.session.carts,
    };
    UserCart.add(option)
      .catch(err => next(err));
  }
  const redirectTo = req.session.lastPosition || '/';
  delete req.session.lastPosition;
  res.redirect(redirectTo);
});

router.get('/logout', (req, res, next) => {
  res.locals.toRender.title = 'Logout';
  req.session.destroy();
  res.end();
});

module.exports = router;
