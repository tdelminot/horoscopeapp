import React from 'react';
import { observer } from 'mobx-react-lite';
import toast from 'react-hot-toast';

const UserForm = observer(({ userViewModel, onSuccess }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await userViewModel.submitProfile();
    if (success) {
      toast.success(`Bienvenue ${userViewModel.name}! Ton signe est ${userViewModel.sign}`);
      onSuccess?.(userViewModel.userId);
    } else {
      toast.error(userViewModel.error);
    }
  };

  return (
    <div className="user-form-container">
      <div className="form-card">
        <h2>✨ Découvre ton Horoscope ✨</h2>
        <p className="form-subtitle">Entre tes informations pour révéler ton destin</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nom complet</label>
            <input
              id="name"
              type="text"
              value={userViewModel.name}
              onChange={(e) => userViewModel.setName(e.target.value)}
              placeholder="Jean Dupont"
              required
              disabled={userViewModel.loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="birthDate">Date de naissance</label>
            <input
              id="birthDate"
              type="date"
              value={userViewModel.birthDate}
              onChange={(e) => userViewModel.setBirthDate(e.target.value)}
              required
              disabled={userViewModel.loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="birthPlace">Lieu de naissance</label>
            <input
              id="birthPlace"
              type="text"
              value={userViewModel.birthPlace}
              onChange={(e) => userViewModel.setBirthPlace(e.target.value)}
              placeholder="Paris, France"
              required
              disabled={userViewModel.loading}
            />
          </div>

          <button 
            type="submit" 
            className="submit-button"
            disabled={userViewModel.loading}
          >
            {userViewModel.loading ? '🌟 Calcul en cours...' : '🔮 Découvrir mon signe'}
          </button>
        </form>

        {userViewModel.sign && (
          <div className="sign-result">
            <h3>Ton signe astrologique est :</h3>
            <div className="sign-badge">{userViewModel.sign}</div>
          </div>
        )}
      </div>
    </div>
  );
});

export default UserForm;
