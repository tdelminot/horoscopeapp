import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

const HoroscopeDisplay = observer(({ horoscopeViewModel, userId }) => {
  useEffect(() => {
    if (userId) {
      horoscopeViewModel.loadDailyHoroscope(userId);
    }
  }, [userId]);

  if (horoscopeViewModel.loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Consultation des astres...</p>
      </div>
    );
  }

  if (!horoscopeViewModel.dailyHoroscope) {
    return null;
  }

  const horoscope = horoscopeViewModel.dailyHoroscope;

  return (
    <div className="horoscope-container">
      <div className="horoscope-header">
        <h2>🌟 Horoscope du jour 🌟</h2>
        <p className="sign-name">Signe: {horoscope.sign}</p>
      </div>

      <div className="horoscope-grid">
        <div className="horoscope-card daily">
          <div className="card-icon">📅</div>
          <h3>Général</h3>
          <p>{horoscope.daily}</p>
        </div>

        <div className="horoscope-card love">
          <div className="card-icon">❤️</div>
          <h3>Amour</h3>
          <p>{horoscope.love}</p>
        </div>

        <div className="horoscope-card career">
          <div className="card-icon">💼</div>
          <h3>Travail</h3>
          <p>{horoscope.career}</p>
        </div>

        <div className="horoscope-card health">
          <div className="card-icon">💪</div>
          <h3>Santé</h3>
          <p>{horoscope.health}</p>
        </div>
      </div>

      <button 
        onClick={() => horoscopeViewModel.refreshHoroscope(userId)}
        className="refresh-button"
      >
        🔄 Actualiser
      </button>
    </div>
  );
});

export default HoroscopeDisplay;
