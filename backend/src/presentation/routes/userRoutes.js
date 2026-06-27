 
const { validateProfile } = require('../middlewares/validate');
const express = require('express');
const { verifyCaptcha } = require('../middlewares/captcha');
 
const setupUserRoutes = (controller) => {
  const router = express.Router();

 router.post('/profile', verifyCaptcha, validateProfile, (req, res, next) =>
    controller.createProfile(req, res, next)
);
  
  router.get('/profile/:id', (req, res, next) => 
    controller.getUserProfile(req, res, next)
  );
  
  router.get('/horoscope/:userId', (req, res, next) => 
    controller.getDailyHoroscope(req, res, next)
  );
  
  router.get('/compatible/:userId', (req, res, next) => 
    controller.getCompatiblePartner(req, res, next)
  );
  
  return router;
};

module.exports = setupUserRoutes;
