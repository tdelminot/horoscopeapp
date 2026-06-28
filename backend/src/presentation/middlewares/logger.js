// backend/src/presentation/middlewares/logger.js
const morgan = require('morgan');
const winston = require('winston');

// 1. Logger Winston pour les fichiers
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

// 2. Logger Morgan pour les requêtes HTTP
const morganLogger = morgan('combined', {
    stream: {
        write: (message) => logger.info(message.trim()),
    },
});

module.exports = { logger, morganLogger };