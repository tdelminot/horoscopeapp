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
git clone https://github.com/tdelminot@gmail.com/horoscope-app.git
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