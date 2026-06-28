// backend/src/presentation/middlewares/antiScraping.js
const rateLimit = require('express-rate-limit');

/**
 * Anti-Scraping Middleware
 * Protège contre le scraping automatisé des données
 */
class AntiScraping {
    constructor() {
        // Détection des bots via User-Agent
        this.botPatterns = [
            /bot/i,
            /crawl/i,
            /spider/i,
            /scrape/i,
            /headless/i,
            /puppeteer/i,
            /selenium/i,
            /phantom/i,
            /curl/i,
            /wget/i,
            /python-requests/i,
            /postman/i,
            /insomnia/i
        ];

        // Rate limiter spécifique pour l'anti-scraping
        this.scrapeLimiter = rateLimit({
            windowMs: 60 * 1000, // 1 minute
            max: 30, // 30 requêtes par minute
            message: {
                success: false,
                error: 'Trop de requêtes détectées. Veuillez ralentir.',
                timestamp: new Date().toISOString()
            },
            standardHeaders: 'draft-8',
            legacyHeaders: false,
            skip: (req) => {
                const excludePaths = ['/health', '/favicon.ico'];
                return excludePaths.includes(req.path);
            }
        });

        // Rate limiter pour les routes sensibles
        this.sensitiveLimiter = rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 50, // 50 requêtes par IP
            message: {
                success: false,
                error: 'Limite de consultation atteinte. Réessayez dans 15 minutes.',
                timestamp: new Date().toISOString()
            },
            standardHeaders: 'draft-8',
            legacyHeaders: false
        });

        // Lier les méthodes à l'instance
        this.protect = this.protect.bind(this);
        this.protectSensitive = this.protectSensitive.bind(this);
        this.protectAll = this.protectAll.bind(this);
        this.securityHeaders = this.securityHeaders.bind(this);
        this.isBot = this.isBot.bind(this);
    }

    /**
     * Vérifie si la requête provient d'un bot
     */
    isBot(req) {
        const userAgent = req.headers['user-agent'] || '';
        const acceptLanguage = req.headers['accept-language'] || '';
        const accept = req.headers['accept'] || '';

        // Vérifier le User-Agent
        for (const pattern of this.botPatterns) {
            if (pattern.test(userAgent)) {
                return true;
            }
        }

        // Vérifier les headers suspects
        if (!acceptLanguage && !accept) {
            return true;
        }

        if (!req.headers['accept-encoding'] && !req.headers['connection']) {
            return true;
        }

        return false;
    }

    /**
     * Middleware principal anti-scraping
     */
    protect(req, res, next) {
        if (this.isBot(req)) {
            console.warn(`🤖 Scraping tenté depuis ${req.ip} - User-Agent: ${req.headers['user-agent']}`);
            return res.status(403).json({
                success: false,
                error: 'Accès non autorisé.',
                code: 'ACCESS_DENIED'
            });
        }
        next();
    }

    /**
     * Middleware pour les routes sensibles
     */
    protectSensitive(req, res, next) {
        // Vérifier d'abord si c'est un bot
        if (this.isBot(req)) {
            console.warn(`🤖 Scraping tenté sur route sensible depuis ${req.ip}`);
            return res.status(403).json({
                success: false,
                error: 'Accès non autorisé.',
                code: 'ACCESS_DENIED'
            });
        }
        // Puis appliquer le rate limiter
        return this.sensitiveLimiter(req, res, next);
    }

    /**
     * Middleware pour toutes les routes
     */
    protectAll(req, res, next) {
        // Vérifier d'abord si c'est un bot
        if (this.isBot(req)) {
            console.warn(`🤖 Scraping tenté depuis ${req.ip}`);
            return res.status(403).json({
                success: false,
                error: 'Accès non autorisé.',
                code: 'ACCESS_DENIED'
            });
        }
        // Puis appliquer le rate limiter
        return this.scrapeLimiter(req, res, next);
    }

    /**
     * Middleware pour les headers de sécurité anti-scraping
     */
    securityHeaders(req, res, next) {
        res.setHeader('X-Robots-Tag', 'noindex, nofollow');
        res.setHeader('X-Content-Type-Options', 'nosniff');
        if (req.path.includes('/api/users/')) {
            res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
        }
        next();
    }
}

// Exporter une instance unique
const antiScraping = new AntiScraping();
module.exports = antiScraping;