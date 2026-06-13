const IHoroscopeRepository = require('../../../domain/repositories/IHoroscopeRepository');

class HoroscopeRepository extends IHoroscopeRepository {
  constructor(dbConnection) {
    super();
    this.db = dbConnection;
  }

  async save(horoscope) {
    const query = `
      INSERT INTO horoscopes (user_id, sign, date, daily, love, career, health, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const values = [
      horoscope.userId,
      horoscope.sign,
      horoscope.date,
      horoscope.daily,
      horoscope.love,
      horoscope.career,
      horoscope.health,
      new Date()
    ];

    try {
      const [result] = await this.db.getPool().execute(query, values);
      return result;
    } catch (error) {
      console.error('Erreur save horoscope:', error);
      throw new Error(`Impossible de sauvegarder l'horoscope: ${error.message}`);
    }
  }

  async findByUserIdAndDate(userId, date) {
    const query = 'SELECT * FROM horoscopes WHERE user_id = ? AND date = ?';
    
    try {
      const [rows] = await this.db.getPool().execute(query, [userId, date]);
      if (rows.length === 0) return null;
      
      const row = rows[0];
      return {
        userId: row.user_id,
        sign: row.sign,
        date: row.date,
        daily: row.daily,
        love: row.love,
        career: row.career,
        health: row.health
      };
    } catch (error) {
      throw new Error(`Erreur findByUserIdAndDate: ${error.message}`);
    }
  }

  async findHistory(userId, limit = 30) {
    const query = `
      SELECT * FROM horoscopes 
      WHERE user_id = ? 
      ORDER BY date DESC 
      LIMIT ?
    `;
    
    try {
      const [rows] = await this.db.getPool().execute(query, [userId, limit]);
      return rows;
    } catch (error) {
      throw new Error(`Erreur findHistory: ${error.message}`);
    }
  }
}

module.exports = HoroscopeRepository;