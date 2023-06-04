/* eslint-disable max-len */
const RefreshAuthenticationUseCase = require('../RefreshAuthenticationUseCase');

describe('RefreshAuthenticationUseCase', () => {
  let refreshAuthenticationUseCase;
  let authenticationRepository;
  let authenticationTokenManager;

  beforeEach(() => {
    authenticationRepository = {
      checkAvailabilityToken: jest.fn(),
    };
    authenticationTokenManager = {
      verifyRefreshToken: jest.fn(),
      decodePayload: jest.fn(),
      createAccessToken: jest.fn(),
    };
    refreshAuthenticationUseCase = new RefreshAuthenticationUseCase({
      authenticationRepository,
      authenticationTokenManager,
    });
  });

  describe('execute', () => {
    it('should create a new access token', async () => {
      // Arrange
      const useCasePayload = {
        refreshToken: 'refresh-token-123',
      };
      const decodedPayload = {
        email: 'test@example.com',
        id: 'user-123',
      };
      const accessToken = 'access-token-123';

      authenticationTokenManager.verifyRefreshToken.mockResolvedValue();
      authenticationRepository.checkAvailabilityToken.mockResolvedValue();
      authenticationTokenManager.decodePayload.mockResolvedValue(decodedPayload);
      authenticationTokenManager.createAccessToken.mockReturnValue(accessToken);

      // Act
      const result = await refreshAuthenticationUseCase.execute(useCasePayload);

      // Assert
      expect(result).toBe(accessToken);
      expect(authenticationTokenManager.verifyRefreshToken).toHaveBeenCalledWith(useCasePayload.refreshToken);
      expect(authenticationRepository.checkAvailabilityToken).toHaveBeenCalledWith(useCasePayload.refreshToken);
      expect(authenticationTokenManager.decodePayload).toHaveBeenCalledWith(useCasePayload.refreshToken);
      expect(authenticationTokenManager.createAccessToken).toHaveBeenCalledWith(decodedPayload);
    });

    it('should throw an error when refreshToken is missing', async () => {
      // Arrange
      const useCasePayload = {};

      // Act and Assert
      await expect(refreshAuthenticationUseCase.execute(useCasePayload)).rejects.toThrow(
        'REFRESH_AUTHENTICATION_USE_CASE.NOT_COUNTAIN_NEEDED_PROPERTY',
      );
    });

    it('should throw an error when refreshToken has incorrect data type', async () => {
      // Arrange
      const useCasePayload = {
        refreshToken: 123,
      };

      // Act and Assert
      await expect(refreshAuthenticationUseCase.execute(useCasePayload)).rejects.toThrow(
        'REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPESIFICATION',
      );
    });
  });
});
