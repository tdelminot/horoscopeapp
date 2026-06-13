import { makeAutoObservable, runInAction } from 'mobx';
import ApiService from '../services/ApiService';

class HoroscopeViewModel {
  dailyHoroscope = null;
  compatibility = null;
  history = [];
  loading = false;
  error = '';

  constructor() {
    makeAutoObservable(this);
    // Initialiser avec des données par défaut
    this.compatibility = {
      sign: 'Bélier',
      compatibleSigns: ['Lion', 'Sagittaire', 'Gémeaux'],
      incompatibleSigns: ['Cancer', 'Capricorne'],
      advice: 'Pour un Bélier, la meilleure compatibilité est avec Lion et Sagittaire. Laissez-vous guider par votre cœur !',
      idealPartner: {
        traits: 'Indépendant(e), aventureux(se), passionné(e)',
        loveCompatibility: 85
      }
    };
    this.dailyHoroscope = {
      sign: 'Bélier',
      daily: 'Journée pleine d\'énergie et de positivité !',
      love: 'Une rencontre inattendue pourrait changer votre journée',
      career: 'Opportunité professionnelle à saisir',
      health: 'Forme olympique aujourd\'hui'
    };
  }

  async loadDailyHoroscope(userId) {
    if (!userId) return;
    
    runInAction(() => {
      this.loading = true;
    });
    
    try {
      const response = await ApiService.getDailyHoroscope(userId);
      runInAction(() => {
        if (response?.success && response?.horoscope) {
          this.dailyHoroscope = response.horoscope;
        }
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        console.error('Erreur loadDailyHoroscope:', error);
        this.loading = false;
      });
    }
  }

  async loadCompatibility(userId) {
    if (!userId) return;
    
    console.log('Chargement compatibilité pour userId:', userId);
    
    runInAction(() => {
      this.loading = true;
    });
    
    try {
      const response = await ApiService.getCompatiblePartner(userId);
      console.log('Réponse compatibilité:', response);
      
      runInAction(() => {
        if (response?.success && response?.compatibility) {
          this.compatibility = response.compatibility;
        }
        this.loading = false;
      });
    } catch (error) {
      console.error('Erreur loadCompatibility:', error);
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async loadHistory(userId, limit = 7) {
    if (!userId) return;
    
    try {
      const response = await ApiService.getHoroscopeHistory(userId, limit);
      runInAction(() => {
        if (response?.success) {
          this.history = response.history || [];
        }
      });
    } catch (error) {
      console.error('Erreur loadHistory:', error);
    }
  }

  refreshHoroscope(userId) {
    this.loadDailyHoroscope(userId);
  }
}

export default HoroscopeViewModel;
