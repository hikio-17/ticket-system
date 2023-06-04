const GetAllTicketUseCase = require('../GetAllTicketUseCase');

describe('GetAllTicketUseCase', () => {
  let getAllTicketUseCase;
  let ticketRepository;

  beforeEach(() => {
    ticketRepository = {
      findAllTicket: jest.fn(),
    };
    getAllTicketUseCase = new GetAllTicketUseCase({ ticketRepository });
  });

  describe('execute', () => {
    it('should get all tickets from the repository', async () => {
      // Arrange
      const userAccess = { userId: 'user-123' };
      const query = { status: 'open' };
      const mockTickets = [
        { id: 'ticket-1', title: 'Ticket 1', status: 'open' },
        { id: 'ticket-2', title: 'Ticket 2', status: 'open' },
      ];
      ticketRepository.findAllTicket.mockResolvedValue(mockTickets);

      // Act
      const tickets = await getAllTicketUseCase.execute(userAccess, query);

      // Assert
      expect(ticketRepository.findAllTicket).toHaveBeenCalledWith(userAccess, query);
      expect(tickets).toEqual(mockTickets);
    });

    it('should throw an error when userAccess is missing', async () => {
      // Arrange
      const userAccess = null;
      const query = { status: 'open' };

      // Act and Assert
      await expect(getAllTicketUseCase.execute(userAccess, query)).rejects.toThrow(
        'GET_ALL_TICKET_USE_CASE.NOT_COUNTAIN_NEEDED_PROPERTY',
      );
    });

    it('should throw an error when userAccess has incorrect data type', async () => {
      // Arrange
      const userAccess = 'user';
      const query = { status: 'open' };

      // Act and Assert
      await expect(getAllTicketUseCase.execute(userAccess, query)).rejects.toThrow(
        'GET_ALL_TICKET_USE_CASE.USER_ACCESS_NOT_MEET_DATA_TYPE_SPESIFICATION',
      );
    });
  });
});
