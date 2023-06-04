/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
const UserRegister = require('../../../domains/user/entities/UserRegister');
const AddUserUseCase = require('../AddUserUseCase');
const UserRepository = require('../../../domains/user/UserRepository');
const PasswordHash = require('../../security/PasswordHash');
const EmailValidator = require('../../../domains/user/validators/EmailValidator');

describe('AddUserUseCase', () => {
  describe('execute', () => {
    it('should add a user', async () => {
      // Arrange
      const useCasePayload = {
        username: 'hikio010217',
        email: 'hikio@gmail.com',
        password: 'secret',
      };

      const mockUserRegistered = {
        id: 'user-123',
        username: useCasePayload.username,
      };

      /** CREATING DEPENDENCY OF USE CASE */
      const mockUserRepository = new UserRepository();
      const mockPasswordHash = new PasswordHash();
      const mockEmailValidator = new EmailValidator();

      /** MOCKING NEEDED FUNCTION */
      mockUserRepository.verifyAvailableEmail = jest.fn().mockResolvedValue();
      mockPasswordHash.hash = jest.fn().mockResolvedValue('encrypted_password');
      mockUserRepository.addUser = jest.fn().mockResolvedValue(mockUserRegistered);
      mockEmailValidator.validate = jest.fn().mockResolvedValue(true);

      /** CREATING USE CASE INSTANCE */
      const addUserUseCase = new AddUserUseCase({
        userRepository: mockUserRepository,
        passwordHash: mockPasswordHash,
        emailValidator: mockEmailValidator,
      });

      // Action
      const userRegistered = await addUserUseCase.execute(useCasePayload);

      // Assert
      expect(userRegistered).toEqual(mockUserRegistered);
      expect(mockUserRepository.verifyAvailableEmail).toBeCalledWith(useCasePayload.email);
      expect(mockPasswordHash.hash).toBeCalledWith(useCasePayload.password);
      expect(mockUserRepository.addUser).toBeCalledWith(expect.objectContaining({
        username: useCasePayload.username,
        email: useCasePayload.email,
        password: 'encrypted_password',
      }));
      expect(mockEmailValidator.validate).toBeCalledWith(useCasePayload.email);
    });

    it('should throw an error for invalid email', async () => {
      // Arrange
      const useCasePayload = {
        email: 'xxxx',
        username: 'hikio',
        password: 'secret',
      };

      /** CREATING DEPENDENCY OF USE CASE */
      const mockUserRepository = new UserRepository();
      const mockPasswordHash = new PasswordHash();
      const mockEmailValidator = new EmailValidator();

      /** MOCKING NEEDED FUNCTION */
      mockUserRepository.verifyAvailableEmail = jest.fn().mockResolvedValue();
      mockPasswordHash.hash = jest.fn().mockResolvedValue('encrypted_password');
      mockEmailValidator.validate = jest.fn().mockImplementation(() => {
        throw new Error('Invalid email!');
      });

      /** CREATING USE CASE INSTANCE */
      const addUserUseCase = new AddUserUseCase({
        userRepository: mockUserRepository,
        passwordHash: mockPasswordHash,
        emailValidator: mockEmailValidator,
      });

      // Action and Assert
      await expect(addUserUseCase.execute(useCasePayload)).rejects.toThrow('Invalid email!');
    });
  });
});
