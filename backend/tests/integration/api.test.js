const request = require('supertest');
const app = require('../../src/presentation/server');

describe('API Integration Tests', () => {
  test('GET /health - devrait retourner OK', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);
    
    expect(response.body).toHaveProperty('status', 'OK');
  });

  test('POST /api/users/profile - devrait créer un utilisateur', async () => {
    const response = await request(app)
      .post('/api/users/profile')
      .send({
        name: 'Test User',
        birthDate: '1990-05-15',
        birthPlace: 'Paris'
      })
      .expect(201);
    
    expect(response.body.success).toBe(true);
    expect(response.body.user).toHaveProperty('sign');
  });
});
