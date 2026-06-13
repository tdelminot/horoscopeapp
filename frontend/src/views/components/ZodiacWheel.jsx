// frontend/src/views/components/ZodiacWheel.jsx
import React from 'react';

const zodiacSigns = [
  { name: 'Bélier', dates: '21 Mar - 19 Avr', element: 'Feu', color: '#FF6B6B' },
  { name: 'Taureau', dates: '20 Avr - 20 Mai', element: 'Terre', color: '#4ECDC4' },
  { name: 'Gémeaux', dates: '21 Mai - 20 Juin', element: 'Air', color: '#45B7D1' },
  { name: 'Cancer', dates: '21 Juin - 22 Juil', element: 'Eau', color: '#96CEB4' },
  { name: 'Lion', dates: '23 Juil - 22 Aoû', element: 'Feu', color: '#FFEAA7' },
  { name: 'Vierge', dates: '23 Aoû - 22 Sep', element: 'Terre', color: '#DFE6E9' },
  { name: 'Balance', dates: '23 Sep - 22 Oct', element: 'Air', color: '#74B9FF' },
  { name: 'Scorpion', dates: '23 Oct - 21 Nov', element: 'Eau', color: '#A29BFE' },
  { name: 'Sagittaire', dates: '22 Nov - 21 Déc', element: 'Feu', color: '#FDCB6E' },
  { name: 'Capricorne', dates: '22 Déc - 19 Jan', element: 'Terre', color: '#E17055' },
  { name: 'Verseau', dates: '20 Jan - 18 Fév', element: 'Air', color: '#6C5CE7' },
  { name: 'Poissons', dates: '19 Fév - 20 Mar', element: 'Eau', color: '#00CEC9' }
];

const ZodiacWheel = ({ currentSign }) => {
  const currentIndex = zodiacSigns.findIndex(s => s.name === currentSign);

  return (
    <div className="zodiac-wheel">
      <div className="wheel-container">
        {zodiacSigns.map((sign, index) => (
          <div
            key={sign.name}
            className={`wheel-sign ${currentSign === sign.name ? 'active' : ''}`}
            style={{
              transform: `rotate(${index * 30}deg) translate(180px) rotate(-${index * 30}deg)`,
              backgroundColor: sign.color
            }}
          >
            <span className="sign-name-wheel">{sign.name}</span>
            <span className="sign-element">{sign.element}</span>
          </div>
        ))}
        <div className="wheel-center">
          <div className="wheel-star">⭐</div>
          <div className="wheel-current">{currentSign || '?'}</div>
        </div>
      </div>
    </div>
  );
};

export default ZodiacWheel;