const NewAuth = require('../NewAuth');

describe('NewAuth entities', () => {
  it('should throw error when payload not countain needed property', () => {
    // Arrange
    const payload = {
      accessToken: 'your_token',
    };

    // Action & Assert
    expect(() => new NewAuth(payload)).toThrowError('NEW_AUTH.NOT_COUNTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not did meet data type spesification', () => {
    // Arrange
    const payload = {
      accessToken: true,
      refreshToken: 12345,
    };

    // Action & Assert
    expect(() => new NewAuth(payload)).toThrowError('NEW_AUTH.NOT_MEET_DATA_TYPE_SPESIFICATION');
  });

  it('should create NewAuth entities correctly', () => {
    // Arrange
    const payload = {
      accessToken: 'Bearer Token',
      refreshToken: 'Bearer Token',
    };

    // Action
    const newAuth = new NewAuth(payload);

    // Assert
    expect(newAuth).toBeInstanceOf(NewAuth);
    expect(newAuth.accessToken).toEqual(payload.accessToken);
    expect(newAuth.refreshToken).toEqual(payload.refreshToken);
  });
});