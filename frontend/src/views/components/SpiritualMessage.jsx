// frontend/src/views/components/SpiritualMessage.jsx
import React, { useState, useEffect } from 'react';

const spiritualMessages = {
  'Bélier': [
    "Votre énergie de pionnier illumine le chemin des autres.",
    "N'ayez pas peur de prendre des risques calculés aujourd'hui.",
    "Votre courage inspire ceux qui vous entourent."
  ],
  'Taureau': [
    "La patience est votre plus grande force en ce moment.",
    "Les plaisirs simples de la vie vous apporteront la paix.",
    "Votre stabilité est un phare pour vos proches."
  ],
  'Gémeaux': [
    "Votre curiosité naturelle ouvre des portes insoupçonnées.",
    "La communication est la clé de votre évolution.",
    "Partagez vos idées, elles sont précieuses."
  ],
  'Cancer': [
    "Votre intuition vous guide vers la bonne direction.",
    "La famille est votre sanctuaire en ce moment.",
    "Votre sensibilité est un don, pas une faiblesse."
  ],
  'Lion': [
    "Votre lumière intérieure brille plus que jamais.",
    "Soyez généreux avec votre cœur et votre temps.",
    "La confiance en vous déplace des montagnes."
  ],
  'Vierge': [
    "Les détails que vous remarquez font la différence.",
    "Votre dévotion est remarquable et appréciée.",
    "Prenez le temps de célébrer vos succès."
  ],
  'Balance': [
    "L'harmonie que vous créez est un cadeau pour tous.",
    "Votre sens de la justice éclaire les situations complexes.",
    "La beauté que vous voyez dans le monde est réelle."
  ],
  'Scorpion': [
    "Votre intensité transforme tout ce que vous touchez.",
    "Les mystères se dévoilent à vous aujourd'hui.",
    "Votre passion est contagieuse dans le bon sens."
  ],
  'Sagittaire': [
    "L'aventure vous appelle vers de nouveaux horizons.",
    "Votre optimisme est un bouclier contre la négativité.",
    "La sagesse vient de vos expériences de voyage."
  ],
  'Capricorne': [
    "Votre détermination inspire le respect.",
    "Les récompenses arrivent à ceux qui persistent.",
    "Votre sagesse pratique guide les autres."
  ],
  'Verseau': [
    "Votre originalité est votre super-pouvoir.",
    "Les idées nouvelles fleurissent autour de vous.",
    "Votre humanité fait une différence dans le monde."
  ],
  'Poissons': [
    "Votre compassion guérit les cœurs blessés.",
    "Les rêves que vous caressez ont du pouvoir.",
    "Votre créativité traverse les dimensions."
  ]
};

const SpiritualMessage = ({ sign }) => {
  const [message, setMessage] = useState(null);
  const [affirmation, setAffirmation] = useState('');

  useEffect(() => {
    if (sign) {
      const messages = spiritualMessages[sign] || spiritualMessages['Bélier'];
      const randomIndex = Math.floor(Math.random() * messages.length);
      setMessage(messages[randomIndex]);
      
      const affirmations = [
        `Je suis aligné(e) avec mon chemin spirituel.`,
        `La sagesse de l'univers me guide.`,
        `Je suis ouvert(e) aux messages des astres.`,
        `Mon intuition est puissante et claire.`
      ];
      setAffirmation(affirmations[Math.floor(Math.random() * affirmations.length)]);
    }
  }, [sign]);

  return (
    <div className="spiritual-message-container">
      <div className="spiritual-header">
        <span className="spiritual-icon">🕉️</span>
        <h2>Message Spirituel</h2>
      </div>

      <div className="spiritual-card">
        <div className="crystal-ball">🔮</div>
        <p className="spiritual-message">{message}</p>
        
        <div className="affirmation-section">
          <h3>Affirmation du jour</h3>
          <p className="affirmation-text">"{affirmation}"</p>
        </div>

        <div className="meditation-tip">
          <h3>🧘 Méditation guidée</h3>
          <p>Prenez 5 minutes pour fermer les yeux, respirer profondément et visualiser votre intention du jour.</p>
        </div>

        <div className="ritual-suggestion">
          <h3>✨ Rituel suggéré</h3>
          <p>Allumez une bougie blanche, fermez les yeux et répétez votre affirmation 3 fois.</p>
        </div>
      </div>
    </div>
  );
};

export default SpiritualMessage;