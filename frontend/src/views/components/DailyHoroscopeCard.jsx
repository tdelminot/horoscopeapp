import React from 'react';

const signBackgrounds = {
  'Bélier': { icon: '🐏', color: '#FF6B6B', element: 'Feu', mantra: 'Je suis courageux(se) et audacieux(se)' },
  'Taureau': { icon: '🐂', color: '#4ECDC4', element: 'Terre', mantra: 'Je suis stable et persévérant(e)' },
  'Gémeaux': { icon: '👥', color: '#45B7D1', element: 'Air', mantra: 'Je suis curieux(se) et adaptable' },
  'Cancer': { icon: '🦀', color: '#96CEB4', element: 'Eau', mantra: 'Je suis protecteur(trice) et aimant(e)' },
  'Lion': { icon: '🦁', color: '#FFEAA7', element: 'Feu', mantra: 'Je suis confiant(e) et généreux(se)' },
  'Vierge': { icon: '👧', color: '#DFE6E9', element: 'Terre', mantra: 'Je suis méthodique et attentionné(e)' },
  'Balance': { icon: '⚖️', color: '#74B9FF', element: 'Air', mantra: 'Je suis équilibré(e) et juste' },
  'Scorpion': { icon: '🦂', color: '#A29BFE', element: 'Eau', mantra: 'Je suis passionné(e) et déterminé(e)' },
  'Sagittaire': { icon: '🏹', color: '#FDCB6E', element: 'Feu', mantra: 'Je suis aventureux(se) et optimiste' },
  'Capricorne': { icon: '🐐', color: '#E17055', element: 'Terre', mantra: 'Je suis ambitieux(se) et responsable' },
  'Verseau': { icon: '💧', color: '#6C5CE7', element: 'Air', mantra: 'Je suis original(e) et humanitaire' },
  'Poissons': { icon: '🐟', color: '#00CEC9', element: 'Eau', mantra: 'Je suis intuitif(ve) et compatissant(e)' }
};

const DailyHoroscopeCard = ({ horoscope, loading, sign }) => {
  if (loading) {
    return (
      <div className="daily-card loading">
        <div className="spinner"></div>
        <p>Consultation des astres...</p>
      </div>
    );
  }

  if (!horoscope) return null;

  const signData = signBackgrounds[sign] || signBackgrounds['Bélier'];

  return (
    <div className="daily-card" style={{ background: `linear-gradient(135deg, ${signData.color}20, #1a1a2e)` }}>
      <div className="daily-card-content">
        <div className="sign-badge-large">
          <span className="sign-icon" style={{ fontSize: '4rem' }}>{signData.icon}</span>
          <h1 style={{ color: signData.color }}>{sign}</h1>
          <p className="sign-element">{signData.element}</p>
        </div>

        <div className="horoscope-sections">
          <div className="horoscope-section">
            <div className="section-icon">📅</div>
            <h3>Vision Globale</h3>
            <p>{horoscope.daily}</p>
          </div>

          <div className="horoscope-section">
            <div className="section-icon">❤️</div>
            <h3>Amour & Relations</h3>
            <p>{horoscope.love}</p>
          </div>

          <div className="horoscope-section">
            <div className="section-icon">💼</div>
            <h3>Carrière & Finances</h3>
            <p>{horoscope.career}</p>
          </div>

          <div className="horoscope-section">
            <div className="section-icon">💪</div>
            <h3>Santé & Bien-être</h3>
            <p>{horoscope.health}</p>
          </div>
        </div>

        <div className="daily-advice">
          <span className="advice-icon">🌟</span>
          <p>Mantra du jour : "{signData.mantra}"</p>
        </div>
      </div>
    </div>
  );
};

export default DailyHoroscopeCard;
