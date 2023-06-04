const UserRegister = require('../UserRegister');

describe('UserRegister', () => {
  describe('constructor', () => {
    it('should throw an error when payload does not contain needed property', () => {
      // Arrange
      const payload = {
        username: '',
        email: 'example.com',
        password: '',
      };

      // Action & Assert
      expect(() => new UserRegister(payload)).toThrowError('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw an error when payload does not meet data type specification', () => {
      // Arrange
      const payload = {
        username: true,
        email: 'email@gmail.com',
        password: {},
      };

      // Action & Assert
      expect(() => new UserRegister(payload)).toThrowError('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should throw an error when username contains more than 30 characters', () => {
      // Arrange
      const payload = {
        username: 'hoikdfiifpfjfjjfdjfaoiehr121332434343434',
        email: 'hikio@gmail.com',
        password: 'secret',
      };

      // Action & Assert
      expect(() => new UserRegister(payload)).toThrowError('REGISTER_USER.USERNAME_LIMIT_CHAR');
    });

    it('should create UserRegister object correctly', () => {
      // Arrange
      const payload = {
        username: 'hikio010217',
        email: 'hikio@gmail.com',
        password: 'secret',
      };

      // Action
      const userRegister = new UserRegister(payload);

      // Assert
      expect(userRegister.username).toEqual(payload.username);
      expect(userRegister.email).toEqual(payload.email);
      expect(userRegister.role).toEqual('user');
      expect(userRegister.password).toEqual(payload.password);
    });
  });
});
