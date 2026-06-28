// backend/src/presentation/routes/horoscopeRoutes.js
const express = require('express');
const antiScraping = require('../middlewares/antiScraping');

const setupHoroscopeRoutes = (controller) => {
    const router = express.Router();

    // GET - Historique des horoscopes
    router.get(
        '/history/:userId',
        antiScraping.protectSensitive,
        (req, res, next) => controller.getHoroscopeHistory(req, res, next)
    );

    // GET - Horoscope par date
    router.get(
        '/:userId/:date',
        antiScraping.protectSensitive,
        (req, res, next) => controller.getHoroscopeByDate(req, res, next)
    );

    return router;
};

module.exports = setupHoroscopeRoutes;