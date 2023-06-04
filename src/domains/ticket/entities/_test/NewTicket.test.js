const NewTicket = require('../NewTicket');

describe('NewTicket', () => {
  describe('constructor', () => {
    it('should create a new ticket with provided payload', () => {
      // Arrange
      const payload = {
        title: 'Test Ticket',
        description: 'This is a test ticket',
        priority: 'high',
      };

      // Act
      const newTicket = new NewTicket(payload);

      // Assert
      expect(newTicket.title).toBe(payload.title);
      expect(newTicket.description).toBe(payload.description);
      expect(newTicket.priority).toBe(payload.priority);
    });

    it('should create a new ticket with default priority "low" if not provided', () => {
      // Arrange
      const payload = {
        title: 'Test Ticket',
        description: 'This is a test ticket',
      };

      // Act
      const newTicket = new NewTicket(payload);

      // Assert
      expect(newTicket.priority).toBe('low');
    });

    it('should throw an error when title or description is missing', () => {
      // Arrange
      const payload = {
        // Missing title and description
      };

      // Act and Assert
      expect(() => new NewTicket(payload)).toThrow('NEW_TICKET.NOT_COUNTAIN_NEEDED_PROPERTY');
    });

    it('should throw an error when title or description has invalid data type', () => {
      // Arrange
      const payload = {
        title: 123, // Invalid data type
        description: 'This is a test ticket',
      };

      // Act and Assert
      expect(() => new NewTicket(payload)).toThrow('NEW_TICKET.PAYLOAD_NOT_MEET_DATA_TYPE_SPESIFICATION');
    });
  });
});
