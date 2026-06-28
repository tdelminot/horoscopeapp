// backend/src/presentation/routes/userRoutes.js
const express = require('express');
const { validateProfile } = require('../middlewares/validate');
const { verifyCaptcha } = require('../middlewares/captcha');
const antiScraping = require('../middlewares/antiScraping');

const setupUserRoutes = (controller, createProfileLimiter) => {
    const router = express.Router();

    // POST - Création de profil avec toutes les protections
    router.post(
        '/profile',
        createProfileLimiter,        // Rate limiting spécifique
        verifyCaptcha,               // Vérification captcha
        validateProfile,             // Validation Joi
        antiScraping.protectSensitive, // Anti-scraping
        (req, res, next) => controller.createProfile(req, res, next)
    );

    // GET - Récupérer un profil
    router.get(
        '/profile/:id',
        antiScraping.protectSensitive,
        (req, res, next) => controller.getUserProfile(req, res, next)
    );

    // GET - Horoscope du jour
    router.get(
        '/horoscope/:userId',
        antiScraping.protectSensitive,
        (req, res, next) => controller.getDailyHoroscope(req, res, next)
    );

    // GET - Compatibilité
    router.get(
        '/compatible/:userId',
        antiScraping.protectSensitive,
        (req, res, next) => controller.getCompatiblePartner(req, res, next)
    );

    return router;
};

module.exports = setupUserRoutes;