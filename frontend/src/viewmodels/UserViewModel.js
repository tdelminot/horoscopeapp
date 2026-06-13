import { makeAutoObservable, runInAction } from 'mobx';
import ApiService from '../services/ApiService';

class UserViewModel {
  name = '';
  birthDate = '';
  birthPlace = '';
  sign = '';
  loading = false;
  error = '';
  userId = null;

  constructor() {
    makeAutoObservable(this);
    this.loadStoredUser();
  }

  setName(value) {
    this.name = value;
  }

  setBirthDate(value) {
    this.birthDate = value;
  }

  setBirthPlace(value) {
    this.birthPlace = value;
  }

  loadStoredUser() {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.userId = storedUserId;
      this.loadUserProfile();
    }
  }

  async loadUserProfile() {
    if (!this.userId) return;
    
    runInAction(() => {
      this.loading = true;
    });
    
    try {
      const response = await ApiService.getUserProfile(this.userId);
      runInAction(() => {
        if (response.success) {
          this.name = response.user.name;
          this.sign = response.user.sign;
          this.birthDate = response.user.birthDate;
          this.birthPlace = response.user.birthPlace;
        }
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        console.error('Erreur chargement profil:', error);
        this.loading = false;
      });
    }
  }

  async submitProfile() {
    if (!this.name || !this.birthDate || !this.birthPlace) {
      runInAction(() => {
        this.error = 'Veuillez remplir tous les champs';
      });
      return false;
    }

    runInAction(() => {
      this.loading = true;
      this.error = '';
    });
    
    try {
      const response = await ApiService.createProfile({
        name: this.name,
        birthDate: this.birthDate,
        birthPlace: this.birthPlace
      });
      
      runInAction(() => {
        if (response.success) {
          this.sign = response.user.sign;
          this.userId = response.user.id;
          localStorage.setItem('userId', response.user.id);
        }
        this.loading = false;
      });
      return true;
    } catch (error) {
      runInAction(() => {
        this.error = error.message || 'Erreur lors de la création du profil';
        this.loading = false;
      });
      return false;
    }
  }

  reset() {
    runInAction(() => {
      this.name = '';
      this.birthDate = '';
      this.birthPlace = '';
      this.sign = '';
      this.error = '';
      this.userId = null;
    });
    localStorage.removeItem('userId');
  }
}

export default UserViewModel;
