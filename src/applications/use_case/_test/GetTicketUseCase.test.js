const GetTicketUseCase = require('../GetTicketUseCase');

describe('GetTicketUseCase', () => {
  let getTicketUseCase;
  let ticketRepository;

  beforeEach(() => {
    ticketRepository = {
      verifyAvailableTicket: jest.fn(),
      verifyAccessTicket: jest.fn(),
      findTicketById: jest.fn(),
    };
    getTicketUseCase = new GetTicketUseCase({ ticketRepository });
  });

  describe('execute', () => {
    it('should get the ticket from the repository', async () => {
      // Arrange
      const ticketId = 'ticket-123';
      const userAccess = { userId: 'user-123' };
      const mockTicket = { id: ticketId, title: 'Ticket 1', status: 'open' };
      ticketRepository.verifyAvailableTicket.mockResolvedValue();
      ticketRepository.verifyAccessTicket.mockResolvedValue();
      ticketRepository.findTicketById.mockResolvedValue(mockTicket);

      // Act
      const ticket = await getTicketUseCase.execute(ticketId, userAccess);

      // Assert
      expect(ticketRepository.verifyAvailableTicket).toHaveBeenCalledWith(ticketId);
      expect(ticketRepository.verifyAccessTicket).toHaveBeenCalledWith(ticketId, userAccess);
      expect(ticketRepository.findTicketById).toHaveBeenCalledWith(ticketId);
      expect(ticket).toEqual(mockTicket);
    });

    it('should throw an error when ticketId is missing', async () => {
      // Arrange
      const ticketId = null;
      const userAccess = { userId: 'user-123' };

      // Act and Assert
      await expect(getTicketUseCase.execute(ticketId, userAccess)).rejects.toThrow(
        'GET_TICKET_USE_CASE.NOT_COUNTAIN_NEEDED_PROPERTY',
      );
    });

    it('should throw an error when userAccess is missing', async () => {
      // Arrange
      const ticketId = 'ticket-123';
      const userAccess = null;

      // Act and Assert
      await expect(getTicketUseCase.execute(ticketId, userAccess)).rejects.toThrow(
        'GET_TICKET_USE_CASE.NOT_COUNTAIN_NEEDED_PROPERTY',
      );
    });

    it('should throw an error when ticketId has incorrect data type', async () => {
      // Arrange
      const ticketId = 123;
      const userAccess = { userId: 'user-123' };

      // Act and Assert
      await expect(getTicketUseCase.execute(ticketId, userAccess)).rejects.toThrow(
        'GET_TICKET_USE_CASE.PARAMS_NOT_MEET_DATA_TYPE_SPESIFICATION',
      );
    });

    it('should throw an error when userAccess has incorrect data type', async () => {
      // Arrange
      const ticketId = 'ticket-123';
      const userAccess = 'user';

      // Act and Assert
      await expect(getTicketUseCase.execute(ticketId, userAccess)).rejects.toThrow(
        'GET_TICKET_USE_CASE.PARAMS_NOT_MEET_DATA_TYPE_SPESIFICATION',
      );
    });
  });
});
