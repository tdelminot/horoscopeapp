require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbConnection = require('../infrastructure/database/mysqlConnection');
const UserRepository = require('../infrastructure/database/repositories/UserRepository');
const HoroscopeRepository = require('../infrastructure/database/repositories/HoroscopeRepository');
const UserController = require('./controllers/UserController');
const HoroscopeController = require('./controllers/HoroscopeController');
const setupUserRoutes = require('./routes/userRoutes');
const setupHoroscopeRoutes = require('./routes/horoscopeRoutes');
const { errorHandler, notFound } = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialisation des repositories
let userRepository;
let horoscopeRepository;
let userController;
let horoscopeController;

// Connexion à la base de données et démarrage
const startServer = async () => {
  try {
    // Connexion MySQL
    await dbConnection.connect();
    
    // Initialisation des repositories
    userRepository = new UserRepository(dbConnection);
    horoscopeRepository = new HoroscopeRepository(dbConnection);
    
    // Initialisation des controllers
    userController = new UserController(userRepository, horoscopeRepository);
    horoscopeController = new HoroscopeController(horoscopeRepository);
    
    // Routes
    app.use('/api/users', setupUserRoutes(userController));
    app.use('/api/horoscopes', setupHoroscopeRoutes(horoscopeController));
    
    // Health check
    app.get('/health', (req, res) => {
      res.json({ status: 'OK', timestamp: new Date().toISOString() });
    });
    
    // Documentation simple
    app.get('/', (req, res) => {
      res.json({
        name: 'Horoscope API',
        version: '1.0.0',
        endpoints: {
          'POST /api/users/profile': 'Créer un profil utilisateur',
          'GET /api/users/profile/:id': 'Récupérer un profil',
          'GET /api/users/horoscope/:userId': 'Horoscope du jour',
          'GET /api/users/compatible/:userId': 'Partenaire idéal',
          'GET /api/horoscopes/history/:userId': 'Historique des horoscopes'
        }
      });
    });
    
    // Gestion d'erreurs
    app.use(notFound);
    app.use(errorHandler);
    
    // Démarrage
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erreur au démarrage:', error);
    process.exit(1);
  }
};

// Gestion propre de l'arrêt
process.on('SIGINT', async () => {
  console.log('\nArrêt du serveur...');
  await dbConnection.close();
  process.exit(0);
});

startServer();

module.exports = app;