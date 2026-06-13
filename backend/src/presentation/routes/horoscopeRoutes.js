const express = require('express');

const setupHoroscopeRoutes = (controller) => {
  const router = express.Router();

  router.get('/history/:userId', (req, res, next) => 
    controller.getHoroscopeHistory(req, res, next)
  );
  
  router.get('/:userId/:date', (req, res, next) => 
    controller.getHoroscopeByDate(req, res, next)
  );
  
  return router;
};

module.exports = setupHoroscopeRoutes;
