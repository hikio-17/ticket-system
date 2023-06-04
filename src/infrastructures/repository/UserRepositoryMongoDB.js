/* eslint-disable no-return-await */
const InvariantError = require('../../commons/exceptions/InvariantError');
const UserRepository = require('../../domains/user/UserRepository');
const User = require('../database/models/User');

class UserRepositoryMongoDB extends UserRepository {
  async addUser({
    username, email, password, role,
  }) {
    const user = await User.create({
      username,
      email,
      role,
      password,
    });
    return {
      userId: user._id,
      username: user.username,
    };
  }

  async verifyAvailableEmail(email) {
    const user = await User.findOne({ email });

    if (user) {
      throw new InvariantError('Email sudah digunakan.');
    }
  }

  async getPasswordByEmail(email) {
    const user = await User.findOne({ email });
    return user.password;
  }

  async getIdByEmail(email) {
    const user = await User.findOne({ email }).select('_id');
    return user._id;
  }

  async getUserByEmail(email) {
    return User.findOne({ email }).select('-password');
  }
}

module.exports = UserRepositoryMongoDB;