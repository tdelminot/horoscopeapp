// backend/src/presentation/middlewares/xss.js
const xss = require('xss');

/**
 * Middleware de protection XSS personnalisé
 * Nettoie les données entrantes (body, query, params)
 */
const xssProtection = (req, res, next) => {
    // Fonction pour nettoyer les objets et tableaux récursivement
    const sanitize = (data) => {
        if (typeof data === 'string') {
            // Utiliser la bibliothèque xss pour nettoyer les chaînes
            return xss(data, {
                whiteList: [], // Liste blanche vide = tout est filtré
                stripIgnoreTag: true, // Supprimer les balises ignorées
                stripIgnoreTagBody: ['script', 'style'], // Supprimer le contenu des balises
            });
        } else if (Array.isArray(data)) {
            return data.map(item => sanitize(item));
        } else if (data && typeof data === 'object') {
            const sanitized = {};
            for (const key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    sanitized[key] = sanitize(data[key]);
                }
            }
            return sanitized;
        }
        return data;
    };

    try {
        // Nettoyer req.body
        if (req.body) {
            req.body = sanitize(req.body);
        }

        // Nettoyer req.query
        if (req.query) {
            req.query = sanitize(req.query);
        }

        // Nettoyer req.params
        if (req.params) {
            req.params = sanitize(req.params);
        }

        // Nettoyer req.headers (attention à ne pas tout nettoyer)
        if (req.headers) {
            // Seulement certains headers sont nettoyés
            const sensitiveHeaders = ['user-agent', 'referer', 'origin'];
            for (const header of sensitiveHeaders) {
                if (req.headers[header]) {
                    req.headers[header] = sanitize(req.headers[header]);
                }
            }
        }

        next();
    } catch (error) {
        console.error('Erreur dans xssProtection:', error);
        next(error);
    }
};

module.exports = xssProtection;