const jwt = require('jsonwebtoken');
const { authCheck, adminCheck } = require('../auth');
const AuthenticationError = require('../../exceptions/AuthenticationError');
const AuthorizationError = require('../../exceptions/AuthorizationError');
const User = require('../../../infrastructures/database/models/User');

// Mocking req, res, and next
const req = {
  headers: {
    authorization: 'Bearer your-token',
  },
};
const res = {};
const next = jest.fn();

// Mocking User.findOne
jest.mock('../../../infrastructures/database/models/User', () => ({
  findOne: jest.fn(),
}));

describe('authCheck', () => {
  it('should call next with AuthenticationError when token format is invalid', async () => {
    req.headers.authorization = 'Invalid Token Format';
    await authCheck(req, res, next);
    expect(next).toHaveBeenCalledWith(new AuthenticationError('format token tidak valid'));
  });

  it('should call next with AuthenticationError when token is missing', async () => {
    req.headers.authorization = undefined;
    await authCheck(req, res, next);
    expect(next).toHaveBeenCalledWith(new AuthenticationError('Missing authentication'));
  });

  it('should call next with AuthenticationError when token verification fails', async () => {
    req.headers.authorization = 'Bearer invalid-token';
    jwt.verify = jest.fn(() => {
      throw new Error('Invalid Token');
    });
    await authCheck(req, res, next);
    expect(next).toHaveBeenCalledWith(new AuthenticationError('Missing authentication'));
  });

  it('should call next with AuthenticationError when user is not found', async () => {
    req.headers.authorization = 'Bearer valid-token';
    jwt.verify = jest.fn(() => ({
      email: 'user@example.com',
    }));
    User.findOne.mockResolvedValueOnce(null);
    await authCheck(req, res, next);
    expect(next).toHaveBeenCalledWith(new AuthenticationError('Missing authentication'));
  });

  it('should set req.user and call next when authentication is successful', async () => {
    req.headers.authorization = 'Bearer valid-token';
    jwt.verify = jest.fn(() => ({
      email: 'user@example.com',
    }));
    const mockUser = {
      _id: 'user-id',
      role: 'user-role',
    };
    User.findOne.mockResolvedValueOnce(mockUser);
    await authCheck(req, res, next);
    expect(req.user).toEqual({
      userId: 'user-id',
      role: 'user-role',
    });
    expect(next).toHaveBeenCalled();
  });
});

describe('adminCheck', () => {
  it('should call next with AuthenticationError when token format is invalid', async () => {
    req.headers.authorization = 'Invalid Token Format';
    await adminCheck(req, res, next);
    expect(next).toHaveBeenCalledWith(new AuthenticationError('format token tidak valid'));
  });

  it('should call next with AuthenticationError when token is missing', async () => {
    req.headers.authorization = undefined;
    await adminCheck(req, res, next);
    expect(next).toHaveBeenCalledWith(new AuthenticationError('Missing authentication'));
  });

  it('should call next with AuthenticationError when token verification fails', async () => {
    req.headers.authorization = 'Bearer invalid-token';
    jwt.verify = jest.fn(() => {
      throw new Error('Invalid Token');
    });
    await adminCheck(req, res, next);
    expect(next).toHaveBeenCalledWith(new AuthenticationError('Missing authentication'));
  });

  it('should call next with AuthenticationError when user is not found', async () => {
    req.headers.authorization = 'Bearer valid-token';
    jwt.verify = jest.fn(() => ({
      email: 'user@example.com',
    }));
    User.findOne.mockResolvedValueOnce(null);
    await adminCheck(req, res, next);
    expect(next).toHaveBeenCalledWith(new AuthenticationError('Missing authentication'));
  });

  it('should call next with AuthorizationError when user role is not admin', async () => {
    req.headers.authorization = 'Bearer valid-token';
    jwt.verify = jest.fn(() => ({
      email: 'user@example.com',
    }));
    const mockUser = {
      _id: 'user-id',
      role: 'user-role',
    };
    User.findOne.mockResolvedValueOnce(mockUser);
    await adminCheck(req, res, next);
    expect(next).toHaveBeenCalledWith(new AuthorizationError('Resource hanya bisa diakses oleh admin'));
  });

  it('should set req.user and call next when authentication and authorization are successful', async () => {
    req.headers.authorization = 'Bearer valid-token';
    jwt.verify = jest.fn(() => ({
      email: 'user@example.com',
    }));
    const mockUser = {
      _id: 'user-id',
      role: 'admin',
    };
    User.findOne.mockResolvedValueOnce(mockUser);
    await adminCheck(req, res, next);
    expect(req.user).toEqual({
      userId: 'user-id',
      role: 'admin',
    });
    expect(next).toHaveBeenCalled();
  });
});
