[![GitHub version](https://img.shields.io/github/v/release/tdelminot/horoscopeapp)](https://github.com/tdelminot/horoscopeapp)
[![GitHub license](https://img.shields.io/github/license/tdelminot/horoscopeapp)](https://github.com/tdelminot/horoscopeapp)
[![Docker](https://img.shields.io/badge/docker-ready-blue)](https://www.docker.com/)
[![Node.js](https://img.shields.io/badge/node.js-18.x-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/react-18.x-blue)](https://reactjs.org/)
#  Horoscope App - Guide Astrologique Complet

Application fullstack d'horoscope avec React, Node.js, MySQL.

##  Fonctionnalités

-  Calcul précis du signe astrologique
-  Horoscope quotidien personnalisé
-  Compatibilité amoureuse et partenaire idéal
-  Historique des horoscopes
-  Interface moderne et responsive
-  Mise à jour en temps réel

##  Installation Rapide

```bash
# Cloner le projet
git clone https://github.com/tdelminot/horoscopeapp.git
cd horoscope-app

# Installer les dépendances
cd backend && npm install
cd ../frontend && npm install

# Configurer les variables d'environnement
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
 
  
# Backend
cd backend && npm run dev

# Frontend (autre terminal)
cd frontend && npm start
