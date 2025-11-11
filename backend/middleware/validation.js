const { body, param, validationResult } = require('express-validator');

// Validation middleware to check for errors
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// User registration validation
exports.registerValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

// Login validation
exports.loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required'),
];

// Medicine creation/update validation
exports.medicineValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Medicine name is required')
    .isLength({ max: 100 }).withMessage('Name must not exceed 100 characters'),
  body('company')
    .trim()
    .notEmpty().withMessage('Company name is required')
    .isLength({ max: 100 }).withMessage('Company name must not exceed 100 characters'),
  body('category')
    .trim()
    .notEmpty().withMessage('Category is required'),
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required'),
  body('price')
    .notEmpty().withMessage('Price is required')
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('stock')
    .notEmpty().withMessage('Stock is required')
    .isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
  body('expiryDate')
    .notEmpty().withMessage('Expiry date is required')
    .isISO8601().withMessage('Please provide a valid date'),
];

// Cart item validation
exports.cartItemValidation = [
  body('medicineId')
    .notEmpty().withMessage('Medicine ID is required')
    .isMongoId().withMessage('Invalid medicine ID'),
  body('quantity')
    .notEmpty().withMessage('Quantity is required')
    .isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
];

// MongoDB ID validation
exports.mongoIdValidation = [
  param('id')
    .isMongoId().withMessage('Invalid ID format'),
];
