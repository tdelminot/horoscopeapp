import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import DailyHoroscopeCard from './DailyHoroscopeCard';
import PartnerCompatibility from './PartnerCompatibility';
import HoroscopeHistory from './HoroscopeHistory';
import ZodiacWheel from './ZodiacWheel';
import SpiritualMessage from './SpiritualMessage';

const Dashboard = observer(({ userViewModel, horoscopeViewModel, userId }) => {
  const [activeTab, setActiveTab] = useState('daily');

  useEffect(() => {
    if (userId && horoscopeViewModel) {
      console.log('Dashboard: Chargement des données pour userId:', userId);
      horoscopeViewModel.loadDailyHoroscope(userId);
      horoscopeViewModel.loadCompatibility(userId);
      horoscopeViewModel.loadHistory(userId, 7);
    }
  }, [userId]);

  const tabs = [
    { id: 'daily', name: '🌟 Horoscope du Jour', icon: '🌙' },
    { id: 'compatibility', name: '💑 Compatibilité', icon: '❤️' },
    { id: 'history', name: '📜 Historique', icon: '🔮' },
    { id: 'spiritual', name: '✨ Message Spirituel', icon: '🕯️' }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="user-info">
          <div className="user-avatar">
            <span className="avatar-icon">⭐</span>
          </div>
          <div className="user-details">
            <h2>{userViewModel?.name || 'Cher Voyageur'}</h2>
            <p className="user-sign">
              Signe: <strong>{userViewModel?.sign || 'Non défini'}</strong>
            </p>
            {userViewModel?.birthDate && (
              <p className="user-birth-place">
                Né(e) le {new Date(userViewModel.birthDate).toLocaleDateString('fr-FR')}
                {userViewModel.birthPlace && ` à ${userViewModel.birthPlace}`}
              </p>
            )}
          </div>
        </div>
      </div>

      <ZodiacWheel currentSign={userViewModel?.sign} />

      <div className="dashboard-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-name">{tab.name}</span>
          </button>
        ))}
      </div>

      <div className="dashboard-content">
        {activeTab === 'daily' && (
          <DailyHoroscopeCard 
            horoscope={horoscopeViewModel?.dailyHoroscope}
            loading={horoscopeViewModel?.loading || false}
            sign={userViewModel?.sign}
          />
        )}
        
        {activeTab === 'compatibility' && (
          <PartnerCompatibility 
            compatibility={horoscopeViewModel?.compatibility}
            loading={horoscopeViewModel?.loading || false}
            sign={userViewModel?.sign}
          />
        )}
        
        {activeTab === 'history' && (
          <HoroscopeHistory 
            history={horoscopeViewModel?.history || []}
            loading={horoscopeViewModel?.loading || false}
          />
        )}
        
        {activeTab === 'spiritual' && (
          <SpiritualMessage sign={userViewModel?.sign} />
        )}
      </div>

      <footer className="dashboard-footer">
        <p className="spiritual-quote">
          "Les étoiles ne forcent pas notre destin, elles nous guident vers notre âme."
        </p>
      </footer>
    </div>
  );
});

export default Dashboard;
