const ClientError = require('../ClientError');

describe('ClientError', () => {
  it('should throw error when directly use it', () => {
    // Arrange
    expect(() => new ClientError('')).toThrowError('cannot instantiate abstract class');
  });
});