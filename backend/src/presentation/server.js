// backend/src/presentation/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
// 1. Import des nouvelles bibliothèques
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

const app = express();
const PORT = process.env.PORT || 3000;

// ======================================
// 2. AJOUT DE LA SÉCURITÉ (MIDDLEWARES GLOBAUX)
// ======================================

// 2.1 HELMET - Sécurise les en-têtes HTTP
app.use(helmet());


app.use(morganLogger);
// 2.2 CORS - À configurer selon votre besoin
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001', // Adresse de votre frontend
    optionsSuccessStatus: 200
}));

// 2.3 RATE LIMITING - Protection contre le spam et les attaques DDoS
// Définition d'un limiteur global
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limite de 100 requêtes par IP
    message: 'Trop de requêtes créées depuis cette IP, veuillez réessayer après 15 minutes.',
    standardHeaders: 'draft-8',
    legacyHeaders: false,
});
// Application du limiteur à toutes les routes
app.use(limiter);

// 2.4 LIMITATION SPÉCIFIQUE pour les routes sensibles (ex: création de profil)
const createProfileLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 heure
    limit: 5, // Max 5 créations de profil par IP
    message: 'Trop de comptes créés depuis cette IP.',
    standardHeaders: 'draft-8',
    legacyHeaders: false,
});

// 2.5 Nettoyage des données contre les attaques XSS et NoSQL
app.use(xssProtection);
app.use(hpp()); // Protège contre les attaques par pollution des paramètres

// 2.6 Limitation de la taille des requêtes JSON (protection contre les attaques par déni de service)
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ======================================
// 3. SUITE DE LA CONFIGURATION
// ======================================

let userRepository;
let horoscopeRepository;
let userController;
let horoscopeController;

const startServer = async () => {
    try {
        await dbConnection.connect();
        userRepository = new UserRepository(dbConnection);
        horoscopeRepository = new HoroscopeRepository(dbConnection);
        userController = new UserController(userRepository, horoscopeRepository);
        horoscopeController = new HoroscopeController(horoscopeRepository);

        // Routes avec le limiteur spécifique
        app.use('/api/users', setupUserRoutes(userController));
        // APPLICATION DU LIMITEUR À LA ROUTE DE CRÉATION DE PROFIL
        // Pour appliquer un limiteur spécifique à une route, vous devez le passer en argument.
        // Voir la section suivante pour la modification de userRoutes.js
        app.use('/api/horoscopes', setupHoroscopeRoutes(horoscopeController));

        app.get('/health', (req, res) => {
            res.json({ status: 'OK', timestamp: new Date().toISOString() });
        });

        app.get('/', (req, res) => {
            res.json({
                name: 'Horoscope API',
                version: '1.0.0',
                endpoints: { /* ... */ }
            });
        });

        app.use(notFound);
        app.use(errorHandler);

        app.listen(PORT, () => {
            console.log(`🚀 Serveur sécurisé démarré sur http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Erreur au démarrage:', error);
        process.exit(1);
    }
};

process.on('SIGINT', async () => {
    console.log('\nArrêt du serveur...');
    await dbConnection.close();
    process.exit(0);
});

startServer();

module.exports = app;