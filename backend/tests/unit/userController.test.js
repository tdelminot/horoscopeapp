const request = require('supertest');
const express = require('express');

// Créer une app de test
const app = express();
app.use(express.json());

// Mock des contrôleurs
app.post('/api/users/profile', (req, res) => {
  const { name, birthDate, birthPlace } = req.body;
  
  if (!name || !birthDate || !birthPlace) {
    return res.status(400).json({ errors: [{ msg: 'Missing fields' }] });
  }
  
  const getSign = (date) => {
    const month = new Date(date).getMonth() + 1;
    const day = new Date(date).getDate();
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taureau';
    return 'Bélier';
  };
  
  res.status(201).json({
    success: true,
    user: {
      id: 'test-123',
      name,
      sign: getSign(birthDate)
    }
  });
});

app.get('/api/users/horoscope/:userId', (req, res) => {
  res.json({
    success: true,
    horoscope: { daily: 'Test horoscope' }
  });
});

describe('User Controller Tests', () => {
  describe('POST /api/users/profile', () => {
    test('devrait créer un utilisateur et retourner son signe', async () => {
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
    });
    
    test('devrait retourner une erreur si des champs sont manquants', async () => {
      const response = await request(app)
        .post('/api/users/profile')
        .send({ name: 'Test' });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
    });
  });
  
  describe('GET /api/users/horoscope/:userId', () => {
    test('devrait retourner l\'horoscope du jour', async () => {
      const response = await request(app)
        .get('/api/users/horoscope/test-123');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.horoscope).toHaveProperty('daily');
    });
  });
});
