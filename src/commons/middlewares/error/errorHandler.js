const DomainErrorTranslator = require('../../exceptions/DomainErrorTranslator');
const ClientError = require('../../exceptions/ClientError');

const errorHandler = ((err, req, res, next) => {
  const translatedError = DomainErrorTranslator.translate(err);
  if (err instanceof ClientError || translatedError.constructor.name === 'InvariantError') {
    res.status(translatedError.statusCode).json({
      status: 'fail',
      message: translatedError.message,
    });
    return;
  }
  console.log(err);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
  next();
});

module.exports = errorHandler;