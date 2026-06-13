class Horoscope {
  constructor(userId, sign, date, daily, love, career, health) {
    this.userId = userId;
    this.sign = sign;
    this.date = date;
    this.daily = daily;
    this.love = love;
    this.career = career;
    this.health = health;
    this.createdAt = new Date();
  }

  static async fetchFromAPI(sign, day = 'today') {
    // Simuler un appel API externe
    const horoscopes = {
      'Bélier': { daily: "Journée pleine d'énergie!", love: "Rencontre inattendue", career: "Opportunité professionnelle", health: "Forme olympique" },
      'Taureau': { daily: "Journée stable et productive", love: "Romance au rendez-vous", career: "Progrès lents mais sûrs", health: "Bonne santé" },
      'Gémeaux': { daily: "Communication facile", love: "Nouvelle connexion", career: "Idées brillantes", health: "Énergie variable" },
      'Cancer': { daily: "Journée émotionnelle", love: "Intimité profonde", career: "Créativité débordante", health: "Sensible" },
      'Lion': { daily: "Sous les projecteurs!", love: "Passion intense", career: "Reconnaissance", health: "Rayonnant" },
      'Vierge': { daily: "Productivité maximale", love: "Attention aux détails", career: "Organisation parfaite", health: "Excellent" },
      'Balance': { daily: "Harmonie et équilibre", love: "Rencontre charmante", career: "Collaboration réussie", health: "Équilibré" },
      'Scorpion': { daily: "Intensité mystérieuse", love: "Connexion profonde", career: "Transformation", health: "Pleine forme" },
      'Sagittaire': { daily: "Aventure et optimisme", love: "Nouvelle expérience", career: "Expansion", health: "Dynamique" },
      'Capricorne': { daily: "Travail acharné payé", love: "Stabilité émotionnelle", career: "Promotion possible", health: "Résistant" },
      'Verseau': { daily: "Originalité et surprises", love: "Rencontre unique", career: "Innovation", health: "Énergique" },
      'Poissons': { daily: "Intuition puissante", love: "Romance idéale", career: "Créativité", health: "Apaisé" }
    };

    const data = horoscopes[sign] || horoscopes['Bélier'];
    return {
      daily: data.daily,
      love: data.love,
      career: data.career,
      health: data.health
    };
  }

  toJSON() {
    return {
      userId: this.userId,
      sign: this.sign,
      date: this.date,
      daily: this.daily,
      love: this.love,
      career: this.career,
      health: this.health
    };
  }
}

module.exports = Horoscope;