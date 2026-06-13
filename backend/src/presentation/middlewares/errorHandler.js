const errorHandler = (err, req, res, next) => {
  console.error('❌ Erreur:', err.stack);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Erreur interne du serveur';
  
  res.status(statusCode).json({
    success: false,
    error: message,
    timestamp: new Date().toISOString(),
    path: req.path
  });
};

const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    error: `Route non trouvée: ${req.method} ${req.url}`
  });
};

module.exports = { errorHandler, notFound };