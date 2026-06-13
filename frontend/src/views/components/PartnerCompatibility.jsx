import React from 'react';

const PartnerCompatibility = ({ compatibility, loading, sign }) => {
  // État de chargement
  if (loading) {
    return (
      <div className="compatibility-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>✨ Analyse de votre compatibilité ✨</p>
          <p className="loading-subtitle">Les étoiles consultent votre thème astral...</p>
        </div>
      </div>
    );
  }

  // Pas encore de données
  if (!compatibility) {
    return (
      <div className="compatibility-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>🔮 Préparation de votre thème de compatibilité 🔮</p>
        </div>
      </div>
    );
  }

  // Données disponibles
  const { compatibleSigns, incompatibleSigns, advice, idealPartner } = compatibility;

  return (
    <div className="compatibility-container">
      <h2>💑 Compatibilité Amoureuse 💑</h2>
      
      <div className="compatibility-card">
        <div className="sign-header">
          <div className="your-sign">
            <span className="sign-label">Votre signe</span>
            <strong>{sign || 'Non défini'}</strong>
          </div>
          <span className="heart-icon">❤️</span>
          <div className="ideal-sign">
            <span className="sign-label">Signe idéal</span>
            <strong>{compatibleSigns?.[0] || '?'}</strong>
          </div>
        </div>

        <div className="compatibility-details">
          <div className="detail-section">
            <h3>✨ Signes compatibles</h3>
            <div className="compatible-badges">
              {compatibleSigns && compatibleSigns.length > 0 ? (
                compatibleSigns.map(s => (
                  <span key={s} className="badge compatible">💖 {s}</span>
                ))
              ) : (
                <p>Analyse en cours...</p>
              )}
            </div>
          </div>

          <div className="detail-section">
            <h3>⚠️ Signes à éviter</h3>
            <div className="compatible-badges">
              {incompatibleSigns && incompatibleSigns.length > 0 ? (
                incompatibleSigns.map(s => (
                  <span key={s} className="badge incompatible">💔 {s}</span>
                ))
              ) : (
                <p>Analyse en cours...</p>
              )}
            </div>
          </div>

          <div className="detail-section advice-section">
            <h3>🌟 Conseil des astres</h3>
            <p className="advice">{advice || 'Suivez votre cœur, les étoiles vous guident'}</p>
          </div>

          <div className="detail-section">
            <h3>💫 Votre partenaire idéal</h3>
            <p className="traits">{idealPartner?.traits || 'Unique et spécial(e)'}</p>
            
            <div className="love-meter">
              <div className="love-meter-label">
                Compatibilité amoureuse
                <span className="love-percentage">{idealPartner?.loveCompatibility || 75}%</span>
              </div>
              <div className="love-meter-bar">
                <div 
                  className="love-meter-fill" 
                  style={{ width: `${idealPartner?.loveCompatibility || 75}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerCompatibility;
