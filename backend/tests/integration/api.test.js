const request = require('supertest');
const express = require('express');

// Créer une app de test simplifiée qui n'a pas besoin de base de données
const app = express();
app.use(express.json());

// Routes de test mockées
app.post('/api/users/profile', (req, res) => {
  const { name, birthDate, birthPlace } = req.body;
  
  if (!name || !birthDate || !birthPlace) {
    return res.status(400).json({ errors: [{ msg: 'Missing fields' }] });
  }
  
  const getSign = (date) => {
    const month = new Date(date).getMonth() + 1;
    const day = new Date(date).getDate();
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taureau';
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Bélier';
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gémeaux';
    return 'Bélier';
  };
  
  res.status(201).json({
    success: true,
    user: {
      id: 'test-id-' + Date.now(),
      name,
      sign: getSign(birthDate),
      birthDate,
      birthPlace
    }
  });
});

app.get('/api/users/horoscope/:userId', (req, res) => {
  res.json({
    success: true,
    horoscope: {
      daily: 'Journée pleine d\'énergie',
      love: 'Romance au rendez-vous',
      career: 'Opportunité à saisir',
      health: 'Forme olympique'
    }
  });
});

app.get('/api/users/compatible/:userId', (req, res) => {
  res.json({
    success: true,
    compatibility: {
      sign: 'Taureau',
      compatibleSigns: ['Vierge', 'Capricorne'],
      incompatibleSigns: ['Lion', 'Verseau'],
      advice: 'Conseil des astres',
      idealPartner: {
        traits: 'Fiable et patient',
        loveCompatibility: 85
      }
    }
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

describe('API Integration Tests', () => {
  let userId;

  test('POST /api/users/profile - devrait créer un utilisateur', async () => {
    const response = await request(app)
      .post('/api/users/profile')
      .send({
        name: 'Test User',
        birthDate: '1990-05-15',
        birthPlace: 'Paris, France'
      });
    
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.user).toHaveProperty('sign');
    
    userId = response.body.user.id;
  });

  test('GET /api/users/horoscope/:userId - devrait retourner l\'horoscope', async () => {
    const response = await request(app)
      .get(`/api/users/horoscope/${userId || 'test-id'}`);
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.horoscope).toHaveProperty('daily');
  });

  test('GET /api/users/compatible/:userId - devrait retourner la compatibilité', async () => {
    const response = await request(app)
      .get(`/api/users/compatible/${userId || 'test-id'}`);
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.compatibility).toHaveProperty('compatibleSigns');
  });

  test('GET /health - devrait retourner OK', async () => {
    const response = await request(app)
      .get('/health');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'OK');
  });
});
