class EmailValidator {
  validate(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);

    if (!isValid) {
      throw new Error('EMAIL_NOT_VALID');
    }
  }
}

module.exports = EmailValidator;