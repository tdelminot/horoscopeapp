const request = require('supertest');
const app = require('../../src/presentation/server');

describe('User Controller Tests', () => {
  describe('POST /api/users/profile', () => {
    it('devrait créer un utilisateur et retourner son signe', async () => {
      const userData = {
        name: 'Test User',
        birthDate: '1990-05-15',
        birthPlace: 'Paris, France'
      };
      
      const response = await request(app)
        .post('/api/users/profile')
        .send(userData);
      
      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.user).toHaveProperty('sign');
      expect(response.body.user.sign).toBe('Taureau');
    });
    
    it('devrait retourner une erreur si des champs sont manquants', async () => {
      const response = await request(app)
        .post('/api/users/profile')
        .send({ name: 'Test' });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
    });
  });
  
  describe('GET /api/users/horoscope/:userId', () => {
    it('devrait retourner l\'horoscope du jour', async () => {
      const userId = 'test-user-1';
      const response = await request(app)
        .get(`/api/users/horoscope/${userId}`);
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.horoscope).toHaveProperty('daily');
    });
  });
});