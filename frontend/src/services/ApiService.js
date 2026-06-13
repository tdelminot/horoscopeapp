import axios from 'axios';

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:3000/api',
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });
  }

  async createProfile(userData) {
    try {
      console.log('Création profil:', userData);
      const response = await this.api.post('/users/profile', userData);
      console.log('Réponse création:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erreur createProfile:', error.response?.data || error.message);
      return { success: false, error: error.response?.data?.error || error.message };
    }
  }

  async getUserProfile(userId) {
    try {
      const response = await this.api.get(`/users/profile/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur getUserProfile:', error.response?.data || error.message);
      return { success: false, error: error.response?.data?.error || error.message };
    }
  }

  async getDailyHoroscope(userId) {
    try {
      const response = await this.api.get(`/users/horoscope/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur getDailyHoroscope:', error.response?.data || error.message);
      return { success: false, error: error.response?.data?.error || error.message };
    }
  }

  async getCompatiblePartner(userId) {
    try {
      const response = await this.api.get(`/users/compatible/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur getCompatiblePartner:', error.response?.data || error.message);
      return { success: false, error: error.response?.data?.error || error.message };
    }
  }

  async getHoroscopeHistory(userId, limit = 30) {
    try {
      const response = await this.api.get(`/horoscopes/history/${userId}?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Erreur getHoroscopeHistory:', error.response?.data || error.message);
      return { success: false, error: error.response?.data?.error || error.message, history: [] };
    }
  }
}

export default new ApiService();
