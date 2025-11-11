const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} = require('../controllers/cartController');
const { protect } = require('../middleware/auth');
const { cartLimiter } = require('../middleware/rateLimiter');
const { cartItemValidation, mongoIdValidation, validate } = require('../middleware/validation');

router.route('/')
  .get(protect, getCart)
  .post(protect, cartLimiter, cartItemValidation, validate, addToCart)
  .delete(protect, clearCart);

router.route('/:itemId')
  .put(protect, cartLimiter, mongoIdValidation, validate, updateCartItem)
  .delete(protect, mongoIdValidation, validate, removeFromCart);

module.exports = router;
