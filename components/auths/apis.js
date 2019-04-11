const { Router } = require('express');
const UserCart = require('../carts/cart');

/**
 * Base Path: /auths
 */
const router = Router();

function renderHelperMiddleware(req, res, next) {
  res.locals.toRender = {
    title: 'Auths',
    currentUrlPath: req.originalUrl,
    userId: req.session.userId || 'Guest',
  };
  next();
}

router.use(renderHelperMiddleware);

/**
 * Get login page
 */
router.get('/login', (req, res, next) => {
  if (req.session.userId) {
    res.redirect('/');
  } else {
    res.render('login');
  }
});

/**
 * Post login as a user
 */
router.post('/login', (req, res, next) => {
  res.locals.toRender.title = 'Login';
  req.session.userId = 'TestUser';

  if (req.session.carts) {
    const option = {
      userId: 'TestUser',
      carts: req.session.carts,
    };
    UserCart.add(option)
      .catch(err => next(err));
  }
  res.redirect('/');
});

router.get('/logout', (req, res, next) => {
  res.locals.toRender.title = 'Logout';
  req.session.destroy(err => next(err));
  res.redirect('/');
});

module.exports = router;
