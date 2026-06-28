// backend/src/presentation/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');

const dbConnection = require('../infrastructure/database/mysqlConnection');
const UserRepository = require('../infrastructure/database/repositories/UserRepository');
const HoroscopeRepository = require('../infrastructure/database/repositories/HoroscopeRepository');
const UserController = require('./controllers/UserController');
const HoroscopeController = require('./controllers/HoroscopeController');
const setupUserRoutes = require('./routes/userRoutes');
const setupHoroscopeRoutes = require('./routes/horoscopeRoutes');
const { errorHandler, notFound } = require('./middlewares/errorHandler');
const { logger, morganLogger } = require('./middlewares/logger');
const xssProtection = require('./middlewares/xss');
const antiScraping = require('./middlewares/antiScraping');

const app = express();
const PORT = process.env.PORT || 3000;

// ======================================
// 1. LOGGING (en premier pour tout logger)
// ======================================
app.use(morganLogger);

// ======================================
// 2. SÉCURITÉ (middlewares globaux)
// ======================================

// Helmet - Sécurise les en-têtes HTTP
app.use(helmet());

// CORS
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    optionsSuccessStatus: 200
}));

// Rate Limiting global
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requêtes par IP
    message: 'Trop de requêtes depuis cette IP, veuillez réessayer après 15 minutes.',
    standardHeaders: 'draft-8',
    legacyHeaders: false,
});
app.use(limiter);

// Rate Limiter spécifique pour la création de profil
const createProfileLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 heure
    max: 5, // 5 créations par IP
    message: 'Trop de comptes créés depuis cette IP.',
    standardHeaders: 'draft-8',
    legacyHeaders: false,
});

// Protection XSS
app.use(xssProtection);

// Protection contre la pollution des paramètres
app.use(hpp());

// Limitation de la taille des requêtes
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Anti-Scraping
app.use(antiScraping.securityHeaders);
app.use(antiScraping.protectAll);

// Routes sensibles protégées par l'anti-scraping
app.use('/api/users/horoscope', antiScraping.protectSensitive);
app.use('/api/users/compatible', antiScraping.protectSensitive);
app.use('/api/horoscopes', antiScraping.protectSensitive);

// ======================================
// 3. ROUTES
// ======================================

let userRepository;
let horoscopeRepository;
let userController;
let horoscopeController;

const startServer = async () => {
    try {
        await dbConnection.connect();
        logger.info('📦 Connecté à MySQL');

        userRepository = new UserRepository(dbConnection);
        horoscopeRepository = new HoroscopeRepository(dbConnection);
        userController = new UserController(userRepository, horoscopeRepository);
        horoscopeController = new HoroscopeController(horoscopeRepository);

        // Routes
        app.use('/api/users', setupUserRoutes(userController, createProfileLimiter));
        app.use('/api/horoscopes', setupHoroscopeRoutes(horoscopeController));

        // Health check
        app.get('/health', (req, res) => {
            res.json({ status: 'OK', timestamp: new Date().toISOString() });
        });

        // Documentation
        app.get('/', (req, res) => {
            res.json({
                name: 'Horoscope API',
                version: '1.1.0',
                security: {
                    helmet: '✅ Activé',
                    rateLimit: '✅ Activé',
                    xssProtection: '✅ Activé',
                    hppProtection: '✅ Activé',
                    antiScraping: '✅ Activé',
                    logging: '✅ Activé'
                },
                endpoints: {
                    'POST /api/users/profile': 'Créer un profil',
                    'GET /api/users/profile/:id': 'Récupérer un profil',
                    'GET /api/users/horoscope/:userId': 'Horoscope du jour',
                    'GET /api/users/compatible/:userId': 'Partenaire idéal',
                    'GET /api/horoscopes/history/:userId': 'Historique'
                }
            });
        });

        app.use(notFound);
        app.use(errorHandler);

        app.listen(PORT, () => {
            logger.info(`🚀 Serveur sécurisé démarré sur http://localhost:${PORT}`);
        });
    } catch (error) {
        logger.error('❌ Erreur au démarrage:', error);
        process.exit(1);
    }
};

process.on('SIGINT', async () => {
    logger.info('\nArrêt du serveur...');
    await dbConnection.close();
    process.exit(0);
});

startServer();

module.exports = app;