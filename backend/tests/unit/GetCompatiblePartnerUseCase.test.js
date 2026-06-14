const GetCompatiblePartnerUseCase = require('../../src/application/useCases/GetCompatiblePartnerUseCase');

describe('GetCompatiblePartnerUseCase', () => {
  let getCompatiblePartnerUseCase;

  beforeEach(() => {
    getCompatiblePartnerUseCase = new GetCompatiblePartnerUseCase();
  });

  test('devrait retourner la compatibilité pour Bélier', () => {
    const result = getCompatiblePartnerUseCase.execute('Bélier');
    
    expect(result).toBeDefined();
    expect(result.sign).toBe('Bélier');
    expect(result.compatibleSigns).toContain('Lion');
    expect(result.compatibleSigns).toContain('Sagittaire');
    expect(result.idealPartner).toHaveProperty('loveCompatibility');
  });

  test('devrait retourner la compatibilité pour Poissons', () => {
    const result = getCompatiblePartnerUseCase.execute('Poissons');
    
    expect(result).toBeDefined();
    expect(result.sign).toBe('Poissons');
    expect(result.compatibleSigns).toContain('Cancer');
    expect(result.compatibleSigns).toContain('Scorpion');
  });

  test('devrait gérer les signes inconnus avec valeur par défaut', () => {
    const result = getCompatiblePartnerUseCase.execute('SigneInconnu');
    
    expect(result).toBeDefined();
    expect(result.compatibleSigns).toBeDefined();
    expect(result.compatibleSigns.length).toBeGreaterThan(0);
  });
});
