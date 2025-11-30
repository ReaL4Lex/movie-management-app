const { body, validationResult } = require('express-validator');

// Validation rules for registration
const validateRegistration = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters')
    .isAlphanumeric()
    .withMessage('Username must contain only letters and numbers'),
  
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    })
];

// Validation rules for login
const validateLogin = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Validation rules for movie
const validateMovie = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Movie name must be between 1 and 200 characters'),
  
  body('description')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  
  body('year')
    .isInt({ min: 1888, max: new Date().getFullYear() + 5 })
    .withMessage(`Year must be between 1888 and ${new Date().getFullYear() + 5}`),
  
  body('genres')
    .custom((value) => {
      if (!value || (Array.isArray(value) && value.length === 0)) {
        throw new Error('At least one genre must be selected');
      }
      return true;
    }),
  
  body('rating')
    .isFloat({ min: 0, max: 10 })
    .withMessage('Rating must be between 0 and 10')
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.array().forEach(error => {
      req.flash('error', error.msg);
    });
    return res.redirect('back');
  }
  next();
};

module.exports = {
  validateRegistration,
  validateLogin,
  validateMovie,
  handleValidationErrors
};
