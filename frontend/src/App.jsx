// frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import UserViewModel from './viewmodels/UserViewModel';
import HoroscopeViewModel from './viewmodels/HoroscopeViewModel';
import UserForm from './views/components/UserForm';
import Dashboard from './views/components/Dashboard';

function App() {
  const [userViewModel] = useState(() => new UserViewModel());
  const [horoscopeViewModel] = useState(() => new HoroscopeViewModel());
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setCurrentUserId(storedUserId);
      setIsAuthenticated(true);
      userViewModel.loadUserProfile();
    }
  }, []);

  const handleProfileSuccess = (userId) => {
    setCurrentUserId(userId);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    userViewModel.reset();
    setIsAuthenticated(false);
    setCurrentUserId(null);
  };

  return (
    <div className="app">
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#1a1a2e',
            color: '#fff',
            borderRadius: '10px',
          },
        }}
      />
      
      {!isAuthenticated ? (
        <UserForm 
          userViewModel={userViewModel} 
          onSuccess={handleProfileSuccess}
        />
      ) : (
        <>
          <button onClick={handleLogout} className="logout-btn">
            ← Quitter
          </button>
          <Dashboard 
            userViewModel={userViewModel}
            horoscopeViewModel={horoscopeViewModel}
            userId={currentUserId}
          />
        </>
      )}
    </div>
  );
}

export default App;