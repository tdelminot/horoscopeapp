class GetCompatiblePartnerUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  execute(sign) {
    // Normaliser le signe
    let userSign = sign;
    if (typeof sign === 'object' && sign.sign) {
      userSign = sign.sign;
    }
    
    // Capitaliser la première lettre
    if (userSign && typeof userSign === 'string') {
      userSign = userSign.charAt(0).toUpperCase() + userSign.slice(1).toLowerCase();
    }
    
    console.log('Calcul compatibilité pour signe:', userSign);
    
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

    // Chercher la compatibilité
    let match = compatibilityDB[userSign];
    
    // Si non trouvé, utiliser Bélier par défaut
    if (!match) {
      match = compatibilityDB['Bélier'];
    }
    
    const result = {
      sign: userSign || 'Bélier',
      compatibleSigns: match.compatible,
      incompatibleSigns: match.incompatible,
      advice: `✨ En amour, les astres révèlent une magnifique harmonie entre ${userSign || 'Bélier'} et ${match.compatible[0]} ✨\n\nLes étoiles indiquent que l'équilibre parfait se trouve dans la complémentarité. Votre partenaire idéal saura apprécier votre nature profonde et vous accompagner dans votre cheminement.\n\n💫 Conseil des astres : Laissez-vous guider par votre intuition, elle ne vous trompe jamais.`,
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
