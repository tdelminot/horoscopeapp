// backend/src/presentation/middlewares/validate.js
const Joi = require('joi');

// Schéma de validation pour la création d'un profil
const profileSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(100)
        .required()
        .messages({
            'string.min': 'Le nom doit contenir au moins 2 caractères.',
            'string.max': 'Le nom ne peut pas dépasser 100 caractères.',
            'any.required': 'Le nom est requis.',
        }),
    birthDate: Joi.date()
        .iso()
        .max('now')
        .min('1900-01-01')
        .required()
        .messages({
            'date.base': 'La date de naissance doit être une date valide.',
            'date.format': 'Format de date invalide (AAAA-MM-JJ).',
            'date.max': 'La date de naissance doit être dans le passé.',
            'any.required': 'La date de naissance est requise.',
        }),
    birthPlace: Joi.string()
        .min(2)
        .max(200)
        .required()
        .messages({
            'string.min': 'Le lieu doit contenir au moins 2 caractères.',
            'any.required': 'Le lieu de naissance est requis.',
        }),
});

// Middleware de validation
const validateProfile = (req, res, next) => {
    // 1. Vérification JOI
    const { error, value } = profileSchema.validate(req.body, { abortEarly: false });

    if (error) {
        // 2. Formatage des erreurs pour le client
        const errors = error.details.map((detail) => ({
            field: detail.path[0],
            message: detail.message,
        }));
        return res.status(400).json({ success: false, errors });
    }

    // 3. Requête validée et nettoyée
    req.body = value;
    next();
};

module.exports = { validateProfile };