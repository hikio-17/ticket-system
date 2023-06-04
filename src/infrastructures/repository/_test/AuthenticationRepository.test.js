/* eslint-disable max-len */
const AuthenticationRepositoryMongoDb = require('../AuthenticationRepositoryMongoDB');
const Authentication = require('../../database/models/Authentication');
const InvariantError = require('../../../commons/exceptions/InvariantError');

describe('AuthenticationRepositoryMongoDb', () => {
  let authenticationRepository;

  beforeEach(() => {
    authenticationRepository = new AuthenticationRepositoryMongoDb();
  });

//   describe('addToken', () => {
//     it('should add a token', async () => {
//       const token = 'sampleToken';
//       const createSpy = jest.spyOn(Authentication, 'create');
//       await authenticationRepository.addToken(token);
//       expect(createSpy).toHaveBeenCalledWith({ token });
//     });
//   });

  describe('checkAvailabilityToken', () => {
    it('should throw an error for a non-existent token', async () => {
      const nonExistentToken = 'nonExistentToken';
      const findOneSpy = jest.spyOn(Authentication, 'findOne').mockResolvedValue(null);

      await expect(authenticationRepository.checkAvailabilityToken(nonExistentToken)).rejects.toThrow(InvariantError);
      expect(findOneSpy).toHaveBeenCalledWith({ token: nonExistentToken });
    });

    it('should not throw an error for an existing token', async () => {
      const existingToken = 'existingToken';
      const findOneSpy = jest.spyOn(Authentication, 'findOne').mockResolvedValue({ token: existingToken });

      await expect(authenticationRepository.checkAvailabilityToken(existingToken)).resolves.toBeUndefined();
      expect(findOneSpy).toHaveBeenCalledWith({ token: existingToken });
    });
  });

//   describe('deleteToken', () => {
//     it('should delete a token', async () => {
//       const token = 'sampleToken';
//       const findOneAndDeleteSpy = jest.spyOn(Authentication, 'findOneAndDelete');
//       await authenticationRepository.deleteToken(token);
//       expect(findOneAndDeleteSpy).toHaveBeenCalledWith({ token });
//     });
//   });
});
