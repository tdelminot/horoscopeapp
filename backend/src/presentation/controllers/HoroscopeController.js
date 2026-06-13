class HoroscopeController {
  constructor(horoscopeRepository) {
    this.horoscopeRepository = horoscopeRepository;
  }

  async getHoroscopeHistory(req, res) {
    try {
      const { userId } = req.params;
      const { limit = 7 } = req.query;
      
      // Retourner un tableau vide  pour l'instant
      res.json({
        success: true,
        history: []
      });
    } catch (error) {
      console.error('Erreur getHoroscopeHistory:', error);
      res.json({
        success: true,
        history: []
      });
    }
  }

  async getHoroscopeByDate(req, res) {
    try {
      const { userId, date } = req.params;
      
      res.json({
        success: true,
        horoscope: null
      });
    } catch (error) {
      console.error('Erreur getHoroscopeByDate:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = HoroscopeController;
