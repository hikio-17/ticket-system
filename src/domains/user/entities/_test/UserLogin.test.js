const UserLogin = require('../UserLogin');

describe('a UserLogin entities', () => {
  it('should throw error when payload did not countain needed property', () => {
    // Arrange
    const payload = {
      email: '',
      password: '',
    };

    // Action & Assert
    expect(() => new UserLogin(payload)).toThrowError('LOGIN_USER.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when did not meet data type spesification', () => {
    // Arrange
    const payload = {
      email: 'email.com',
      password: true,
    };

    // Action & Assert
    expect(() => new UserLogin(payload)).toThrowError('LOGIN_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create UserLogin object correctly', () => {
    // Arrange
    const payload = {
      email: 'hikio@gmail.com',
      password: 'secret',
    };

    // Action
    const { email, password } = new UserLogin(payload);

    // Assert
    expect(email).toEqual(payload.email);
    expect(password).toEqual(payload.password);
  });
});
