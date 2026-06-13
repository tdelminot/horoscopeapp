import React from 'react';

const HoroscopeHistory = ({ history, loading }) => {
  if (loading) {
    return (
      <div className="history-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Chargement de votre journal astral...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="history-container">
      <h2>📖 Votre Journal Astral</h2>
      <p className="history-subtitle">
        Consultez votre horoscope chaque jour pour enrichir votre journal
      </p>

      {!history || history.length === 0 ? (
        <div className="history-empty">
          <div className="empty-icon">🔮</div>
          <h3>Pas encore d'historique</h3>
          <p>Votre journal astral se remplira au fil de vos consultations.</p>
          <p className="history-tip">✨ Consultez votre horoscope quotidiennement pour suivre votre évolution ✨</p>
        </div>
      ) : (
        <div className="history-timeline">
          {history.map((item, index) => (
            <div key={index} className="history-item">
              <div className="history-date">
                <span className="date-day">
                  {new Date(item.date).toLocaleDateString('fr-FR', { weekday: 'long' })}
                </span>
                <span className="date-full">
                  {new Date(item.date).toLocaleDateString('fr-FR')}
                </span>
              </div>
              <div className="history-content">
                <p className="history-daily">{item.daily?.substring(0, 100)}...</p>
                <details className="history-details">
                  <summary>Voir le message complet 🔮</summary>
                  <div className="details-grid">
                    <div className="detail-item">
                      <strong>❤️ Amour:</strong>
                      <p>{item.love}</p>
                    </div>
                    <div className="detail-item">
                      <strong>💼 Carrière:</strong>
                      <p>{item.career}</p>
                    </div>
                    <div className="detail-item">
                      <strong>💪 Santé:</strong>
                      <p>{item.health}</p>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HoroscopeHistory;
