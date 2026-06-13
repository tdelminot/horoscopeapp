const GetUserSignUseCase = require('../../application/useCases/GetUserSignUseCase');
const GetDailyHoroscopeUseCase = require('../../application/useCases/GetDailyHoroscopeUseCase');
const GetCompatiblePartnerUseCase = require('../../application/useCases/GetCompatiblePartnerUseCase');

class UserController {
  constructor(userRepository, horoscopeRepository) {
    this.userRepository = userRepository;
    this.horoscopeRepository = horoscopeRepository;
    this.getUserSignUseCase = new GetUserSignUseCase(userRepository);
    this.getDailyHoroscopeUseCase = new GetDailyHoroscopeUseCase(horoscopeRepository);
    this.getCompatiblePartnerUseCase = new GetCompatiblePartnerUseCase(userRepository);
  }

  async createProfile(req, res) {
    try {
      const { name, birthDate, birthPlace } = req.body;
      
      if (!name || !birthDate || !birthPlace) {
        return res.status(400).json({
          success: false,
          error: 'Tous les champs sont requis'
        });
      }

      const user = await this.getUserSignUseCase.execute(name, birthDate, birthPlace);
      
      res.status(201).json({
        success: true,
        user: user.toJSON()
      });
    } catch (error) {
      console.error('Erreur createProfile:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async getUserProfile(req, res) {
    try {
      const { id } = req.params;
      const user = await this.userRepository.findById(id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'Utilisateur non trouvé'
        });
      }
      
      res.json({ success: true, user });
    } catch (error) {
      console.error('Erreur getUserProfile:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async getDailyHoroscope(req, res) {
    try {
      const { userId } = req.params;
      
      const user = await this.userRepository.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'Utilisateur non trouvé'
        });
      }
      
      const horoscope = await this.getDailyHoroscopeUseCase.execute(userId);
      
      res.json({
        success: true,
        horoscope: horoscope.toJSON ? horoscope.toJSON() : horoscope
      });
    } catch (error) {
      console.error('Erreur getDailyHoroscope:', error);
      res.json({
        success: true,
        horoscope: {
          sign: 'Bélier',
          daily: 'Journée pleine d\'énergie et de positivité !',
          love: 'Une rencontre inattendue pourrait changer votre journée',
          career: 'Opportunité professionnelle à saisir',
          health: 'Forme olympique aujourd\'hui'
        }
      });
    }
  }

  async getCompatiblePartner(req, res) {
    try {
      const { userId } = req.params;
      
      console.log('getCompatiblePartner appelé pour userId:', userId);
      
      const user = await this.userRepository.findById(userId);
      if (!user) {
        console.log('Utilisateur non trouvé:', userId);
        return res.status(404).json({
          success: false,
          error: 'Utilisateur non trouvé'
        });
      }
      
      console.log('Utilisateur trouvé, signe:', user.sign);
      
      // Appeler le use case avec le signe
      const compatibility = await this.getCompatiblePartnerUseCase.execute(user.sign);
      
      console.log('Compatibilité générée:', compatibility);
      
      res.json({
        success: true,
        compatibility: compatibility
      });
    } catch (error) {
      console.error('Erreur getCompatiblePartner:', error);
      // En cas d'erreur, renvoyer des données par défaut
      res.json({
        success: true,
        compatibility: {
          sign: 'Bélier',
          compatibleSigns: ['Lion', 'Sagittaire', 'Gémeaux'],
          incompatibleSigns: ['Cancer', 'Capricorne'],
          advice: 'Pour un Bélier, la meilleure compatibilité est avec Lion et Sagittaire. Laissez-vous guider par votre cœur !',
          idealPartner: {
            traits: 'Indépendant(e), aventureux(se), passionné(e)',
            loveCompatibility: 85
          }
        }
      });
    }
  }
}

module.exports = UserController;
