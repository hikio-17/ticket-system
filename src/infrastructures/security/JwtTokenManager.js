/* eslint-disable max-len */
const jwt = require('jsonwebtoken');
const AuthenticationTokenManager = require('../../applications/security/AuthenticationTokenManager');
const InvariantError = require('../../commons/exceptions/InvariantError');

class JwtTokenManager extends AuthenticationTokenManager {
  async createAccessToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, { expiresIn: String(process.env.ACCESS_TOKEN_AGE) });
  }

  async createRefreshToken(payload) {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, { expiresIn: String(process.env.ACCESS_TOKEN_AGE) });
  }

  async verifyRefreshToken(payload) {
    return jwt.verify(payload, process.env.REFRESH_TOKEN_KEY, (err, decode) => {
      if (err) {
        throw new InvariantError('refresh token tidak valid');
      }
      return true;
    });
  }

  async decodePayload(payload) {
    return jwt.decode(payload);
  }
}

module.exports = JwtTokenManager;