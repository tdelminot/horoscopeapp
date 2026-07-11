// backend/src/infrastructure/database/mysqlConnection.js
const mysql = require('mysql2/promise');
require('dotenv').config();

class MySQLConnection {
  constructor() {
    this.pool = null;
  }

  async connect() {
    try {
      // Utiliser .env.test pour les tests
      const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
      require('dotenv').config({ path: envFile });
      
      console.log('🔌 Tentative de connexion à MySQL Aiven...');
      console.log(`📡 Host: ${process.env.DB_HOST}`);
      console.log(`🔢 Port: ${process.env.DB_PORT}`);
      console.log(`📚 Database: ${process.env.DB_NAME}`);
      console.log(`👤 User: ${process.env.DB_USER}`);
      console.log(`🔑 Password: ${process.env.DB_PASSWORD ? '*****' : 'vide'}`);

      // Configuration pour Aiven avec SSL
      this.pool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'horoscope_db',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0,
        connectTimeout: 30000,
        // 🔑 AJOUT : Configuration SSL pour Aiven
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      });

      // Tester la connexion
      const connection = await this.pool.getConnection();
      console.log('✅ Connecté à MySQL Aiven avec succès !');
      console.log(`📊 Version MySQL: ${connection.serverVersion || '8.4.8'}`);
      connection.release();
      
      return this.pool;
    } catch (error) {
      if (process.env.NODE_ENV !== 'test') {
        console.error('❌ Erreur de connexion MySQL:', error.message);
        console.error('💡 Vérifie les informations dans le fichier .env');
      }
      throw error;
    }
  }

  getPool() {
    if (!this.pool) {
      throw new Error('Base de données non connectée. Appelez connect() d\'abord.');
    }
    return this.pool;
  }

  async close() {
    if (this.pool) {
      await this.pool.end();
      if (process.env.NODE_ENV !== 'test') {
        console.log('MySQL déconnecté');
      }
    }
  }
}

module.exports = new MySQLConnection();