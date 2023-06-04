/* eslint-disable max-len */
const DeleteTicketUseCase = require('../DeleteTicketUseCase');
const TicketRepository = require('../../../domains/ticket/TicketRepository');

describe('DeleteTicketUseCase', () => {
  let deleteTicketUseCase;
  let ticketRepository;

  beforeEach(() => {
    ticketRepository = {
      verifyAvailableTicket: jest.fn(),
      verifyAccessTicket: jest.fn(),
      deleteTicketById: jest.fn(),
    };
    deleteTicketUseCase = new DeleteTicketUseCase({ ticketRepository });
  });

  describe('execute', () => {
    it('should delete a ticket from the repository', async () => {
      // Arrange
      const ticketId = 'ticket-123';
      const userAccess = { userId: 'user-123' };

      // Act
      await deleteTicketUseCase.execute(ticketId, userAccess);

      // Assert
      expect(ticketRepository.verifyAvailableTicket).toHaveBeenCalledWith(ticketId);
      expect(ticketRepository.verifyAccessTicket).toHaveBeenCalledWith(ticketId, userAccess);
      expect(ticketRepository.deleteTicketById).toHaveBeenCalledWith(ticketId);
    });

    it('should throw an error when ticketId or userAccess is missing', async () => {
      // Arrange
      const ticketId = null;
      const userAccess = null;

      // Act and Assert
      await expect(deleteTicketUseCase.execute(ticketId, userAccess)).rejects.toThrow(
        'DELETE_TICKET_USE_CASE.NOT_COUNTAIN_NEEDED_PROPERTY',
      );
    });

    it('should throw an error when ticketId or userAccess has incorrect data type', async () => {
      // Arrange
      const ticketId = 123;
      const userAccess = 'user';

      // Act and Assert
      await expect(deleteTicketUseCase.execute(ticketId, userAccess)).rejects.toThrow(
        'DELETE_TICKET_USE_CASE.PARAMS_NOT_MEET_DATA_TYPE_SPESIFICATION',
      );
    });
  });
});
