const UpdateStatusTicket = require('../UpdateStatusTicket');

describe('UpdateStatusTicket', () => {
  describe('constructor', () => {
    it('should create an instance of UpdateStatusTicket with valid payload', () => {
      // Arrange
      const payload = {
        status: 'menunggu tindakan',
      };

      // Act
      const updateStatusTicket = new UpdateStatusTicket(payload);

      // Assert
      expect(updateStatusTicket.status).toBe(payload.status);
    });

    it('should throw an error when payload is missing the required property', () => {
      // Arrange
      const payload = {};

      // Act and Assert
      expect(() => new UpdateStatusTicket(payload)).toThrow(
        'UPDATE_STATUS_TICKET.NOT_CONTAIN_NEEDED_PROPERTY',
      );
    });

    it('should throw an error when payload has incorrect data type', () => {
      // Arrange
      const payload = {
        status: 123,
      };

      // Act and Assert
      expect(() => new UpdateStatusTicket(payload)).toThrow(
        'UPDATE_STATUS_TICKET.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION',
      );
    });

    it('should throw an error if status is not one of the allowed options', () => {
      // Arrange
      const payload = {
        status: 'status tidak valid',
      };

      // Act and Assert
      expect(() => new UpdateStatusTicket(payload)).toThrow(
        'UPDATE_STATUS_TICKET.PAYLOAD_NOT_MEET_DATA_OPTIONS',
      );
    });
  });
});
