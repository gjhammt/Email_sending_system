// middlewares/validators.js
const { body } = require('express-validator');

exports.leadValidationRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),

  body('email')
    .trim()
    .isEmail().withMessage('Invalid email address'),

  body('message')
    .trim()
    .notEmpty().withMessage('Message cannot be empty')
    .isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
];