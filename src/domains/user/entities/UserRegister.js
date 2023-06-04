class UserRegister {
  constructor(payload) {
    this._verifyPayload(payload);
    const {
      username, email, password, role,
    } = payload;

    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role || 'user';
  }

  _verifyPayload({
    username, email, password,
  }) {
    if (!username || !email || !password) {
      throw new Error('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof username !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
      throw new Error('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    if (username.length > 30) {
      throw new Error('REGISTER_USER.USERNAME_LIMIT_CHAR');
    }
  }
}

module.exports = UserRegister;
