const axios = require('axios');

class HoroscopeAPI {
  constructor() {
    this.baseURL = process.env.HOROSCOPE_API_URL || 'https://api.aztro.com';
  }

  async getDailyHoroscope(sign, day = 'today') {
    // Simulation d'API car l'API réelle peut avoir des limitations
    const horoscopes = {
      'Bélier': { daily: "Énergie débordante aujourd'hui!", love: "Rencontre passionnante", career: "Opportunité à saisir", health: "Forme olympique" },
      'Taureau': { daily: "Journée stable et sereine", love: "Romance au rendez-vous", career: "Progrès constants", health: "Bien-être général" },
      'Gémeaux': { daily: "Communication facile", love: "Nouvelle connexion", career: "Idées innovantes", health: "Énergie variable" },
      'Cancer': { daily: "Intuition développée", love: "Harmonie familiale", career: "Créativité", health: "Sensible mais bien" },
      'Lion': { daily: "Sous les projecteurs", love: "Passion intense", career: "Reconnaissance", health: "Rayonnant" },
      'Vierge': { daily: "Productivité maximale", love: "Attention aux détails", career: "Organisation parfaite", health: "Excellent" },
      'Balance': { daily: "Harmonie et beauté", love: "Rencontre charmante", career: "Collaboration réussie", health: "Équilibré" },
      'Scorpion': { daily: "Intensité mystérieuse", love: "Connexion profonde", career: "Transformation", health: "Pleine forme" },
      'Sagittaire': { daily: "Aventure et optimisme", love: "Nouvelle expérience", career: "Expansion", health: "Dynamique" },
      'Capricorne': { daily: "Travail acharné payé", love: "Stabilité", career: "Promotion", health: "Résistant" },
      'Verseau': { daily: "Originalité et surprises", love: "Rencontre unique", career: "Innovation", health: "Énergique" },
      'Poissons': { daily: "Rêve et créativité", love: "Romance idéale", career: "Inspiration", health: "Apaisé" }
    };
    
    return horoscopes[sign] || horoscopes['Bélier'];
  }
}

module.exports = HoroscopeAPI;
