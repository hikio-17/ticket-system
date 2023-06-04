const ClientError = require('../ClientError');
const NotFoundError = require('../NotFoundError');

describe('NotFoundError', () => {
  it('should create NotFoundError correctly', () => {
    const notFoundError = new NotFoundError('not found error!');

    expect(notFoundError).toBeInstanceOf(NotFoundError);
    expect(notFoundError).toBeInstanceOf(ClientError);
    expect(notFoundError).toBeInstanceOf(Error);

    expect(notFoundError.statusCode).toEqual(404);
    expect(notFoundError.name).toEqual('NotFoundError');
    expect(notFoundError.message).toEqual('not found error!');
  });
});