// backend/src/presentation/middlewares/captcha.js
const axios = require('axios');

const verifyCaptcha = async (req, res, next) => {
    // Ne pas appliquer en environnement de développement (ou pour les tests)
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
        return next();
    }

    const captchaToken = req.body['g-recaptcha-response']; // Ou le nom de votre champ

    if (!captchaToken) {
        return res.status(400).json({ success: false, message: 'Captcha requis.' });
    }

    try {
        const secretKey = process.env.RECAPTCHA_SECRET_KEY;
        const response = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`
        );

        if (response.data.success && response.data.score >= 0.5) {
            // Captcha valide, on continue
            next();
        } else {
            res.status(400).json({ success: false, message: 'Échec de la validation du captcha.' });
        }
    } catch (error) {
        console.error('Erreur de vérification du captcha:', error);
        res.status(500).json({ success: false, message: 'Erreur du serveur lors de la vérification du captcha.' });
    }
};

module.exports = { verifyCaptcha };