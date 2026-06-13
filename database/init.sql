CREATE DATABASE IF NOT EXISTS horoscope_db;
USE horoscope_db;

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    birth_date DATE NOT NULL,
    birth_place VARCHAR(200) NOT NULL,
    sign VARCHAR(50),
    email VARCHAR(100),
    password VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_sign (sign),
    INDEX idx_created_at (created_at)
);

-- Table des horoscopes
CREATE TABLE IF NOT EXISTS horoscopes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    sign VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    daily TEXT,
    love TEXT,
    career TEXT,
    health TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_date (user_id, date),
    INDEX idx_user_id (user_id),
    INDEX idx_date (date),
    INDEX idx_sign (sign)
);

-- Table pour les favoris (extension future)
CREATE TABLE IF NOT EXISTS favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    horoscope_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (horoscope_id) REFERENCES horoscopes(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id)
);

-- Table pour les notifications (extension future)
CREATE TABLE IF NOT EXISTS notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    type VARCHAR(50),
    message TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_read (user_id, is_read)
);

-- Insertion de données de test
INSERT INTO users (id, name, birth_date, birth_place, sign) VALUES
('test-user-1', 'Sophie Martin', '1990-05-15', 'Paris, France', 'Taureau'),
('test-user-2', 'Thomas Bernard', '1985-08-22', 'Lyon, France', 'Lion');

INSERT INTO horoscopes (user_id, sign, date, daily, love, career, health) VALUES
('test-user-1', 'Taureau', CURDATE(), 'Journée productive sous le signe de la chance', 'Rencontre inattendue ce soir', 'Opportunité professionnelle à saisir', 'Bonne forme physique');

INSERT INTO horoscopes (user_id, sign, date, daily, love, career, health) VALUES
('test-user-1', 'Taureau', DATE_SUB(CURDATE(), INTERVAL 1 DAY), 'Énergie positive en hausse', 'Moments tendres en famille', 'Créativité au travail', 'Pleine vitalité');