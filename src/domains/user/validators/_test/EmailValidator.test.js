const EmailValidator = require('../EmailValidator');

describe('EmailValidator', () => {
  let emailValidator;

  beforeEach(() => {
    emailValidator = new EmailValidator();
  });

  describe('validate', () => {
    it('should throw an error if the email is not valid', () => {
      const invalidEmails = [
        'invalidemail', // Missing @ and domain
        'invalid.email.com', // Missing @
        'invalid@', // Missing domain
        'invalid@domain', // Missing top-level domain
        'invalid@domain.', // Missing top-level domain
      ];

      invalidEmails.forEach((email) => {
        expect(() => emailValidator.validate(email)).toThrow('EMAIL_NOT_VALID');
      });
    });

    it('should not throw an error if the email is valid', () => {
      const validEmails = [
        'validemail@example.com',
        'another.valid.email@example.co.uk',
        'valid-email@example-domain.com',
        'valid_email@example.com',
      ];

      validEmails.forEach((email) => {
        expect(() => emailValidator.validate(email)).not.toThrow('EMAIL_NOT_VALID');
      });
    });
  });
});
