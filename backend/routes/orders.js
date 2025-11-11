const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrderById,
  getMyOrders,
  getOrders,
  updateOrderToPaid,
  updateOrderStatus
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/auth');
const { orderLimiter } = require('../middleware/rateLimiter');
const { mongoIdValidation, validate } = require('../middleware/validation');

router.route('/')
  .post(protect, orderLimiter, createOrder)
  .get(protect, admin, getOrders);

router.get('/myorders', protect, getMyOrders);
router.get('/:id', protect, mongoIdValidation, validate, getOrderById);
router.put('/:id/pay', protect, mongoIdValidation, validate, updateOrderToPaid);
router.put('/:id/status', protect, admin, mongoIdValidation, validate, updateOrderStatus);

module.exports = router;
