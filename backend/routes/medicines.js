const express = require('express');
const router = express.Router();
const {
  getMedicines,
  getMedicine,
  createMedicine,
  updateMedicine,
  deleteMedicine,
  getCategories
} = require('../controllers/medicineController');
const { protect, admin } = require('../middleware/auth');
const { apiLimiter } = require('../middleware/rateLimiter');
const { medicineValidation, mongoIdValidation, validate } = require('../middleware/validation');

router.get('/categories', getCategories);
router.route('/')
  .get(getMedicines)
  .post(protect, admin, apiLimiter, medicineValidation, validate, createMedicine);

router.route('/:id')
  .get(mongoIdValidation, validate, getMedicine)
  .put(protect, admin, apiLimiter, mongoIdValidation, medicineValidation, validate, updateMedicine)
  .delete(protect, admin, apiLimiter, mongoIdValidation, validate, deleteMedicine);

module.exports = router;
