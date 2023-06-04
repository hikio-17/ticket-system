const jwt = require('jsonwebtoken');
const AuthenticationError = require('../exceptions/AuthenticationError');
const AuthorizationError = require('../exceptions/AuthorizationError');
const User = require('../../infrastructures/database/models/User');

exports.authCheck = async (req, res, next) => {
  try {
    const [type, token] = req.headers.authorization.split(' ');
    if (type !== 'Bearer') {
      next(new AuthenticationError('format token tidak valid'));
    }
    const { email } = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    const user = await User.findOne({ email });
    req.user = {
      userId: user._id.toString(),
      role: user.role,
    };
    next();
  } catch (error) {
    next(new AuthenticationError('Missing authentication'));
  }
};

exports.adminCheck = async (req, res, next) => {
  try {
    const [type, token] = req.headers.authorization.split(' ');
    if (type !== 'Bearer') {
      next(new AuthenticationError('format token tidak valid'));
    }
    const { email } = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    const user = await User.findOne({ email });

    if (user.role !== 'admin') {
      next(new AuthorizationError('Resource hanya bisa diakses oleh admin'));
    }

    req.user = {
      userId: user._id.toString(),
      role: user.role,
    };
    next();
  } catch (error) {
    next(new AuthenticationError('Missing authentication'));
  }
};
