class IHoroscopeRepository {
  async save(horoscope) {
    throw new Error('Method not implemented');
  }

  async findByUserIdAndDate(userId, date) {
    throw new Error('Method not implemented');
  }

  async findHistory(userId, limit = 30) {
    throw new Error('Method not implemented');
  }
}

module.exports = IHoroscopeRepository;