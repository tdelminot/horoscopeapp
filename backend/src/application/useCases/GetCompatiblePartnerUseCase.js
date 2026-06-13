class GetCompatiblePartnerUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(sign) {
    // Si sign est un objet user, extraire le signe
    let userSign = sign;
    if (typeof sign === 'object' && sign.sign) {
      userSign = sign.sign;
    }
    
    console.log('Calcul compatibilité pour signe:', userSign);
    
    // Base de données de compatibilité complète
    const compatibilityDB = {
      'Bélier': { 
        compatible: ['Lion', 'Sagittaire', 'Gémeaux'], 
        incompatible: ['Cancer', 'Capricorne'],
        traits: 'Indépendant(e), aventureux(se), passionné(e)',
        loveCompatibility: 85
      },
      'Taureau': { 
        compatible: ['Vierge', 'Capricorne', 'Cancer'], 
        incompatible: ['Lion', 'Verseau'],
        traits: 'Fiable, patient(e), sensuel(le)',
        loveCompatibility: 82
      },
      'Gémeaux': { 
        compatible: ['Balance', 'Verseau', 'Bélier'], 
        incompatible: ['Vierge', 'Poissons'],
        traits: 'Curieux(se), communicatif(ve), adaptable',
        loveCompatibility: 75
      },
      'Cancer': { 
        compatible: ['Scorpion', 'Poissons', 'Taureau'], 
        incompatible: ['Bélier', 'Balance'],
        traits: 'Protecteur(trice), loyal(e), émotionnel(le)',
        loveCompatibility: 88
      },
      'Lion': { 
        compatible: ['Bélier', 'Sagittaire', 'Balance'], 
        incompatible: ['Taureau', 'Scorpion'],
        traits: 'Généreux(se), confiant(e), charismatique',
        loveCompatibility: 90
      },
      'Vierge': { 
        compatible: ['Taureau', 'Capricorne', 'Cancer'], 
        incompatible: ['Sagittaire', 'Poissons'],
        traits: 'Méticuleux(se), pratique, loyal(e)',
        loveCompatibility: 78
      },
      'Balance': { 
        compatible: ['Gémeaux', 'Verseau', 'Lion'], 
        incompatible: ['Cancer', 'Capricorne'],
        traits: 'Diplomate, charmant(e), juste',
        loveCompatibility: 80
      },
      'Scorpion': { 
        compatible: ['Cancer', 'Poissons', 'Vierge'], 
        incompatible: ['Lion', 'Verseau'],
        traits: 'Passionné(e), mystérieux(se), déterminé(e)',
        loveCompatibility: 92
      },
      'Sagittaire': { 
        compatible: ['Bélier', 'Lion', 'Balance'], 
        incompatible: ['Vierge', 'Poissons'],
        traits: 'Optimiste, aventureux(se), honnête',
        loveCompatibility: 83
      },
      'Capricorne': { 
        compatible: ['Taureau', 'Vierge', 'Scorpion'], 
        incompatible: ['Bélier', 'Balance'],
        traits: 'Responsable, discipliné(e), ambitieux(se)',
        loveCompatibility: 76
      },
      'Verseau': { 
        compatible: ['Gémeaux', 'Balance', 'Sagittaire'], 
        incompatible: ['Taureau', 'Scorpion'],
        traits: 'Original(e), indépendant(e), humanitaire',
        loveCompatibility: 72
      },
      'Poissons': { 
        compatible: ['Cancer', 'Scorpion', 'Capricorne'], 
        incompatible: ['Gémeaux', 'Vierge'],
        traits: 'Compatissant(e), artistique, intuitif(ve)',
        loveCompatibility: 89
      }
    };

    // Normaliser le signe (première lettre majuscule)
    const normalizedSign = userSign.charAt(0).toUpperCase() + userSign.slice(1).toLowerCase();
    const match = compatibilityDB[normalizedSign] || compatibilityDB['Bélier'];
    
    const result = {
      sign: normalizedSign,
      compatibleSigns: match.compatible,
      incompatibleSigns: match.incompatible,
      advice: `✨ En amour, les astres révèlent une magnifique harmonie entre ${normalizedSign} et ${match.compatible[0]} ✨

Les étoiles indiquent que l'équilibre parfait se trouve dans la complémentarité. Votre partenaire idéal saura apprécier votre nature profonde et vous accompagner dans votre cheminement.

💫 Conseil des astres : Laissez-vous guider par votre intuition, elle ne vous trompe jamais.`,
      idealPartner: {
        traits: match.traits,
        loveCompatibility: match.loveCompatibility
      }
    };
    
    console.log('Résultat compatibilité:', result);
    return result;
  }
}

module.exports = GetCompatiblePartnerUseCase;
