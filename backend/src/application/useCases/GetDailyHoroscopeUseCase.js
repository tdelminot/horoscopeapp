const Horoscope = require('../../domain/entities/Horoscope');

class GetDailyHoroscopeUseCase {
  constructor(horoscopeRepository) {
    this.horoscopeRepository = horoscopeRepository;
  }

  async execute(userId) {
    try {
      const date = new Date();
      const dateString = date.toISOString().split('T')[0];
      
      // Données mockées pour tous les signes
      const horoscopes = {
        'Bélier': { daily: "Énergie débordante aujourd'hui!", love: "Rencontre passionnante", career: "Opportunité à saisir", health: "Forme olympique" },
        'Taureau': { daily: "Journée stable et sereine", love: "Romance au rendez-vous", career: "Progrès constants", health: "Bien-être général" },
        'Gémeaux': { daily: "Communication facile", love: "Nouvelle connexion", career: "Idées innovantes", health: "Énergie variable" },
        'Cancer': { daily: "Intuition développée", love: "Harmonie familiale", career: "Créativité", health: "Sensible mais bien" },
        'Lion': { daily: "Sous les projecteurs", love: "Passion intense", career: "Reconnaissance", health: "Rayonnant" },
        'Vierge': { daily: "Productivité maximale", love: "Attention aux détails", career: "Organisation parfaite", health: "Excellent" },
        'Capricorne': { daily: "Travail acharné payé", love: "Stabilité", career: "Promotion", health: "Résistant" },
        'Verseau': { daily: "Originalité et surprises", love: "Rencontre unique", career: "Innovation", health: "Énergique" },
        'Poissons': { daily: "Rêve et créativité", love: "Romance idéale", career: "Inspiration", health: "Apaisé" },
        'Lion': { daily: "Rayonnement et succès", love: "Passion dévorante", career: "Reconnaissance", health: "Pleine forme" },
        'Vierge': { daily: "Organisation et efficacité", love: "Attention aux détails", career: "Progrès", health: "Bon équilibre" },
        'Balance': { daily: "Harmonie et beauté", love: "Rencontre charmante", career: "Collaboration réussie", health: "Équilibré" },
        'Scorpion': { daily: "Intensité et mystère", love: "Connexion profonde", career: "Transformation", health: "Pleine énergie" },
        'Sagittaire': { daily: "Aventure et optimisme", love: "Nouvelle expérience", career: "Expansion", health: "Dynamique" }
      };
      
      // Essayer de récupérer depuis la base de données
      try {
        let horoscope = await this.horoscopeRepository.findByUserIdAndDate(userId, dateString);
        if (horoscope) {
          return horoscope;
        }
      } catch (dbError) {
        console.log('Erreur DB, utilisation données mockées');
      }
      
      // Retourner des données mockées basées sur l'ID
      const signIndex = userId.length % 12;
      const signs = Object.keys(horoscopes);
      const sign = signs[signIndex] || 'Bélier';
      const data = horoscopes[sign];
      
      return {
        userId,
        sign,
        date: dateString,
        daily: data.daily,
        love: data.love,
        career: data.career,
        health: data.health,
        toJSON: function() { return this; }
      };
    } catch (error) {
      console.error('Erreur GetDailyHoroscopeUseCase:', error);
      // Retourner des données par défaut
      return {
        userId,
        sign: 'Bélier',
        date: new Date().toISOString().split('T')[0],
        daily: "Les astres sont alignés pour vous aujourd'hui",
        love: "L'amour est dans l'air",
        career: "Une belle opportunité se présente",
        health: "Prenez soin de vous",
        toJSON: function() { return this; }
      };
    }
  }
}

module.exports = GetDailyHoroscopeUseCase;
