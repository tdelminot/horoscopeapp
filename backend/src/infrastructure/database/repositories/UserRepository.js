const IUserRepository = require('../../../domain/repositories/IUserRepository');

class UserRepository extends IUserRepository {
  constructor(dbConnection) {
    super();
    this.db = dbConnection;
  }

  async save(user) {
    const query = `
      INSERT INTO users (id, name, birth_date, birth_place, sign, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
      name = VALUES(name),
      birth_date = VALUES(birth_date),
      birth_place = VALUES(birth_place),
      sign = VALUES(sign)
    `;
    
    const values = [
      user.id,
      user.name,
      user.birthDate,
      user.birthPlace,
      user.sign,
      user.createdAt
    ];

    try {
      const [result] = await this.db.getPool().execute(query, values);
      return result;
    } catch (error) {
      console.error('Erreur save user:', error);
      throw new Error(`Impossible de sauvegarder l'utilisateur: ${error.message}`);
    }
  }

  async findById(id) {
    const query = 'SELECT * FROM users WHERE id = ?';
    
    try {
      const [rows] = await this.db.getPool().execute(query, [id]);
      if (rows.length === 0) return null;
      
      const row = rows[0];
      return {
        id: row.id,
        name: row.name,
        birthDate: row.birth_date,
        birthPlace: row.birth_place,
        sign: row.sign,
        createdAt: row.created_at
      };
    } catch (error) {
      console.error('Erreur findById:', error);
      throw new Error(`Impossible de trouver l'utilisateur: ${error.message}`);
    }
  }

  async findByEmail(email) {
    // Pour l'extension future avec authentification
    const query = 'SELECT * FROM users WHERE email = ?';
    try {
      const [rows] = await this.db.getPool().execute(query, [email]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw new Error(`Erreur findByEmail: ${error.message}`);
    }
  }

  async update(user) {
    const query = `
      UPDATE users 
      SET name = ?, birth_date = ?, birth_place = ?, sign = ?
      WHERE id = ?
    `;
    
    const values = [user.name, user.birthDate, user.birthPlace, user.sign, user.id];
    
    try {
      const [result] = await this.db.getPool().execute(query, values);
      return result;
    } catch (error) {
      throw new Error(`Impossible de mettre à jour l'utilisateur: ${error.message}`);
    }
  }

  async delete(id) {
    const query = 'DELETE FROM users WHERE id = ?';
    try {
      const [result] = await this.db.getPool().execute(query, [id]);
      return result;
    } catch (error) {
      throw new Error(`Impossible de supprimer l'utilisateur: ${error.message}`);
    }
  }
}

module.exports = UserRepository;