const { body, param, validationResult } = require('express-validator');

const validateProfile = [
  body('name')
    .trim()
    .notEmpty().withMessage('Le nom est requis')
    .isLength({ min: 2, max: 100 }).withMessage('Le nom doit contenir entre 2 et 100 caractères'),
  
  body('birthDate')
    .notEmpty().withMessage('La date de naissance est requise')
    .isISO8601().withMessage('Format de date invalide')
    .custom((value) => {
      const date = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - date.getFullYear();
      if (age < 0 || age > 120) {
        throw new Error('Âge invalide (entre 0 et 120 ans)');
      }
      return true;
    }),
  
  body('birthPlace')
    .trim()
    .notEmpty().withMessage('Le lieu de naissance est requis')
    .isLength({ min: 2, max: 200 }).withMessage('Lieu trop long'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateId = [
  param('id')
    .isUUID().withMessage('ID utilisateur invalide'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateProfile, validateId };