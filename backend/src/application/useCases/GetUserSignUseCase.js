const User = require('../../domain/entities/User');
const { v4: uuidv4 } = require('uuid');

class GetUserSignUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(name, birthDate, birthPlace) {
    try {
      const id = uuidv4();
      const user = new User(id, name, birthDate, birthPlace);
      user.sign = user.calculateSign();
      
      await this.userRepository.save(user);
      
      return user;
    } catch (error) {
      throw new Error(`Erreur lors de la création du profil: ${error.message}`);
    }
  }
}

module.exports = GetUserSignUseCase;