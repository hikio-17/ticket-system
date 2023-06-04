/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable max-len */
const NewAuth = require('../../../Domains/authentications/entities/NewAuth');
const AuthenticationRepository = require('../../../domains/authentications/AuthenticationRepository');

const UserRepository = require('../../../domains/user/UserRepository');
const EmailValidator = require('../../../domains/user/validators/EmailValidator');
const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager');
const PasswordHash = require('../../security/PasswordHash');
const LoginUserUseCase = require('../LoginUserUseCase');

describe('GetAuthenticationUseCase', () => {
  it('should orchestrating the get authentication action correctly', async () => {
    /** ARRANGE */
    const payload = {
      email: 'hikio@gmail.com',
      password: 'secret',
    };

    const mockAuhtentication = new NewAuth({
      accessToken: 'access_token',
      refreshToken: 'refresh_token',
    });

    const mockUserRepository = new UserRepository();
    const mockAuthenticationTokenManager = new AuthenticationTokenManager();
    const mockPasswordHash = new PasswordHash();
    const mockAuthenticationRepository = new AuthenticationRepository();
    const mockEmailValidator = new EmailValidator();

    // Mocking
    mockUserRepository.getPasswordByEmail = jest.fn().mockImplementation(() => Promise.resolve('encrypted_password'));
    mockPasswordHash.comparePassword = jest.fn(() => Promise.resolve());
    mockUserRepository.getIdByEmail = jest.fn().mockImplementation(() => Promise.resolve('user-123'));
    mockAuthenticationTokenManager.createAccessToken = jest.fn().mockImplementation(() => Promise.resolve(mockAuhtentication.accessToken));
    mockAuthenticationTokenManager.createRefreshToken = jest.fn().mockImplementation(() => Promise.resolve(mockAuhtentication.refreshToken));
    mockAuthenticationRepository.addToken = jest.fn(() => Promise.resolve());

    // create use case
    const loginUseCase = new LoginUserUseCase({
      userRepository: mockUserRepository,
      authenticationRepository: mockAuthenticationRepository,
      passwordHash: mockPasswordHash,
      authenticationTokenManager: mockAuthenticationTokenManager,
      emailValidator: mockEmailValidator,
    });

    // Action
    const actualAuthentication = await loginUseCase.execute(payload);

    // Assert
    expect(actualAuthentication).toEqual(new NewAuth({
      accessToken: 'access_token',
      refreshToken: 'refresh_token',
    }));
    expect(mockUserRepository.getPasswordByEmail).toBeCalledWith('hikio@gmail.com');
    expect(mockPasswordHash.comparePassword).toBeCalledWith('secret', 'encrypted_password');
    expect(mockUserRepository.getIdByEmail).toBeCalledWith('hikio@gmail.com');
    expect(mockAuthenticationTokenManager.createAccessToken).toBeCalledWith({ email: 'hikio@gmail.com', id: 'user-123' });
    expect(mockAuthenticationTokenManager.createRefreshToken).toBeCalledWith({ email: 'hikio@gmail.com', id: 'user-123' });
    expect(mockAuthenticationRepository.addToken).toBeCalledWith(mockAuhtentication.refreshToken);
  });
});