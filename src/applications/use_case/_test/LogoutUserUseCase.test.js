/* eslint-disable max-len */
const LogoutUserUseCase = require('../LogoutUserUseCase');

describe('LogoutUserUseCase', () => {
  let logoutUserUseCase;
  let authenticationRepository;
  let authenticationTokenManager;

  beforeEach(() => {
    authenticationRepository = {
      checkAvailabilityToken: jest.fn(),
      deleteToken: jest.fn(),
    };
    authenticationTokenManager = {}; // Replace with your implementation of authenticationTokenManager
    logoutUserUseCase = new LogoutUserUseCase({ authenticationRepository, authenticationTokenManager });
  });

  describe('execute', () => {
    it('should delete the token from the repository', async () => {
      // Arrange
      const useCasePayload = {
        refreshToken: 'refresh-token-123',
      };
      authenticationRepository.checkAvailabilityToken.mockResolvedValue();
      authenticationRepository.deleteToken.mockResolvedValue();

      // Act
      await logoutUserUseCase.execute(useCasePayload);

      // Assert
      expect(authenticationRepository.checkAvailabilityToken).toHaveBeenCalledWith(useCasePayload.refreshToken);
      expect(authenticationRepository.deleteToken).toHaveBeenCalledWith(useCasePayload.refreshToken);
    });

    it('should throw an error when refreshToken is missing', async () => {
      // Arrange
      const useCasePayload = {};

      // Act and Assert
      await expect(logoutUserUseCase.execute(useCasePayload)).rejects.toThrow(
        'DELETE_AUTHENTICATION_USE_CASE.NOT_COUNTAIN_NEEDED_PROPERTY',
      );
    });

    it('should throw an error when refreshToken has incorrect data type', async () => {
      // Arrange
      const useCasePayload = {
        refreshToken: 123,
      };

      // Act and Assert
      await expect(logoutUserUseCase.execute(useCasePayload)).rejects.toThrow(
        'DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPESIFICATION',
      );
    });
  });
});
