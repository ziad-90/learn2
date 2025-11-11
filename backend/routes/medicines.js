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

router.get('/categories', getCategories);
router.route('/')
  .get(getMedicines)
  .post(protect, admin, createMedicine);

router.route('/:id')
  .get(getMedicine)
  .put(protect, admin, updateMedicine)
  .delete(protect, admin, deleteMedicine);

module.exports = router;
