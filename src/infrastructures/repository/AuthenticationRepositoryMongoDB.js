const AuthenticationRepository = require('../../domains/authentications/AuthenticationRepository');
const Authentication = require('../database/models/Authentication');
const InvariantError = require('../../commons/exceptions/InvariantError');

class AuthenticationRepositoryMongoDb extends AuthenticationRepository {
  async addToken(token) {
    await Authentication.create({ token });
  }

  async checkAvailabilityToken(token) {
    const tokenExisting = await Authentication.findOne({ token });

    if (!tokenExisting) {
      throw new InvariantError('refresh token tidak ditemukan di database');
    }
  }

  async deleteToken(token) {
    await Authentication.findOneAndDelete({ token });
  }
}

module.exports = AuthenticationRepositoryMongoDb;