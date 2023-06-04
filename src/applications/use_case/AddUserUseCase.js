const UserRegister = require('../../domains/user/entities/UserRegister');

class AddUserUseCase {
  constructor({ userRepository, passwordHash, emailValidator }) {
    this._userRepository = userRepository;
    this._passwordHash = passwordHash;
    this._emailValidator = emailValidator;
  }

  async execute(useCasePayload) {
    const userRegister = new UserRegister(useCasePayload);

    /* istanbul ignore next */
    this._emailValidator.validate(userRegister.email);

    await this._userRepository.verifyAvailableEmail(userRegister.email);
    userRegister.password = await this._passwordHash.hash(userRegister.password);
    return this._userRepository.addUser(userRegister);
  }
}

module.exports = AddUserUseCase;