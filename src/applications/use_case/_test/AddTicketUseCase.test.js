const AddTicketUseCase = require('../AddTicketUseCase');
const TicketRepository = require('../../../domains/ticket/TicketRepository');
const NewTicket = require('../../../domains/ticket/entities/NewTicket');

jest.mock('../../../domains/ticket/entities/NewTicket', () => jest.fn().mockImplementation((payload) => ({
  title: payload.title,
  description: payload.description,
  priority: payload.priority || 'low',
})));

describe('AddTicketUseCase', () => {
  let addTicketUseCase;
  let ticketRepository;

  beforeEach(() => {
    ticketRepository = new TicketRepository();
    addTicketUseCase = new AddTicketUseCase({ ticketRepository });
  });

  describe('execute', () => {
    it('should add a new ticket to the repository', async () => {
      // Arrange
      const useCasePayload = {
        title: 'Test Ticket',
        description: 'This is a test ticket',
        priority: 'high',
      };
      const credentialId = '123';

      const newTicketInstance = {
        title: useCasePayload.title,
        description: useCasePayload.description,
        priority: useCasePayload.priority,
      };

      jest.spyOn(ticketRepository, 'addTicket').mockResolvedValue(newTicketInstance);

      // Act
      const result = await addTicketUseCase.execute(useCasePayload, credentialId);

      // Assert
      expect(result).toEqual(newTicketInstance);
      expect(ticketRepository.addTicket).toHaveBeenCalledWith(newTicketInstance, credentialId);
      expect(NewTicket).toHaveBeenCalledWith(useCasePayload);
    });

    it('should throw an error when credentialId is missing', async () => {
      // Arrange
      const useCasePayload = {
        title: 'Test Ticket',
        description: 'This is a test ticket',
      };
      const credentialId = null;

      // Act and Assert
      await expect(addTicketUseCase.execute(useCasePayload, credentialId)).rejects.toThrow(
        'ADD_TICKET_USE_CASE.NOT_COUNTAIN_CREDENTIAL_ID',
      );
    });

    it('should throw an error when credentialId is not a string', async () => {
      // Arrange
      const useCasePayload = {
        title: 'Test Ticket',
        description: 'This is a test ticket',
      };
      const credentialId = 123;

      // Act and Assert
      await expect(addTicketUseCase.execute(useCasePayload, credentialId)).rejects.toThrow(
        'ADD_TICKET_USE_CASE.CREDENTIAL_ID_NOT_MEET_DATA_TYPE_SPESIFICATION',
      );
    });
  });
});
