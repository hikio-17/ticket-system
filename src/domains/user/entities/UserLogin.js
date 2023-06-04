class UserLogin {
  constructor(payload) {
    this._verifyPayload(payload);

    const { email, password } = payload;
    this.email = email;
    this.password = password;
  }

  _verifyPayload({ email, password }) {
    if (!email || !password) {
      throw new Error('LOGIN_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof email !== 'string' || typeof password !== 'string') {
      throw new Error('LOGIN_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = UserLogin;
