const GetUserSignUseCase = require('../../src/application/useCases/GetUserSignUseCase');

// Mock du repository
const mockUserRepository = {
  save: jest.fn().mockResolvedValue(true)
};

describe('GetUserSignUseCase', () => {
  let getUserSignUseCase;

  beforeEach(() => {
    getUserSignUseCase = new GetUserSignUseCase(mockUserRepository);
    jest.clearAllMocks();
  });

  test('devrait calculer le signe Bélier correctement', async () => {
    const user = await getUserSignUseCase.execute(
      'Test User',
      '1990-03-25',
      'Paris'
    );
    
    expect(user.sign).toBe('Bélier');
    expect(mockUserRepository.save).toHaveBeenCalled();
  });

  test('devrait calculer le signe Taureau correctement', async () => {
    const user = await getUserSignUseCase.execute(
      'Test User',
      '1990-05-15',
      'Paris'
    );
    
    expect(user.sign).toBe('Taureau');
  });

  test('devrait calculer le signe Lion correctement', async () => {
    const user = await getUserSignUseCase.execute(
      'Test User',
      '1990-08-10',
      'Paris'
    );
    
    expect(user.sign).toBe('Lion');
  });

  test('devrait gérer les erreurs de sauvegarde', async () => {
    const mockRepositoryError = {
      save: jest.fn().mockRejectedValue(new Error('DB Error'))
    };
    const useCaseWithError = new GetUserSignUseCase(mockRepositoryError);
    
    await expect(useCaseWithError.execute(
      'Test User',
      '1990-03-25',
      'Paris'
    )).rejects.toThrow('DB Error');
  });
});
