const TicketRepository = require('../TicketRepository');

describe('TicketRepository', () => {
  let ticketRepository;

  beforeEach(() => {
    ticketRepository = new TicketRepository();
  });

  describe('addTicket', () => {
    it('should throw an error when addTicket method is called', async () => {
      const payload = { /* payload data */ };
      const userId = 'userId';

      await expect(ticketRepository.addTicket(payload, userId)).rejects.toThrow(
        'TICKET_REPOSITORY.METHOD_NOT_IMPLEMENTED',
      );
    });
  });

  describe('findTicketById', () => {
    it('should throw an error when findTicketById method is called', async () => {
      const ticketId = 'ticketId';
      const userId = 'userId';

      await expect(ticketRepository.findTicketById(ticketId, userId)).rejects.toThrow(
        'TICKET_REPOSITORY.METHOD_NOT_IMPLEMENTED',
      );
    });
  });

  describe('findAllTicket', () => {
    it('should throw an error when findAllTicket method is called', async () => {
      const userAccess = 'userAccess';
      const query = { /* query data */ };

      await expect(ticketRepository.findAllTicket(userAccess, query)).rejects.toThrow(
        'TICKET_REPOSITORY.METHOD_NOT_IMPLEMENTED',
      );
    });
  });

  describe('updateStatusTicket', () => {
    it('should throw an error when updateStatusTicket method is called', async () => {
      const status = 'status';
      const ticketId = 'ticketId';

      await expect(ticketRepository.updateStatusTicket(status, ticketId)).rejects.toThrow(
        'TICKET_REPOSITORY.METHOD_NOT_IMPLEMENTED',
      );
    });
  });

  describe('verifyAvailableTicket', () => {
    it('should throw an error when verifyAvailableTicket method is called', async () => {
      const ticketId = 'ticketId';

      await expect(ticketRepository.verifyAvailableTicket(ticketId)).rejects.toThrow(
        'TICKET_REPOSITORY.METHOD_NOT_IMPLEMENTED',
      );
    });
  });

  describe('verifyAccessTicket', () => {
    it('should throw an error when verifyAccessTicket method is called', async () => {
      const ticketId = 'ticketId';
      const userId = 'userId';

      await expect(ticketRepository.verifyAccessTicket(ticketId, userId)).rejects.toThrow(
        'TICKET_REPOSITORY.METHOD_NOT_IMPLEMENTED',
      );
    });
  });

  describe('deleteTicketById', () => {
    it('should throw an error when deleteTicketById method is called', async () => {
      const ticketId = 'ticketId';

      await expect(ticketRepository.deleteTicketById(ticketId)).rejects.toThrow(
        'TICKET_REPOSITORY.METHOD_NOT_IMPLEMENTED',
      );
    });
  });

  describe('getUserIdByTicketId', () => {
    it('should throw an error when getUserIdByTicketId method is called', async () => {
      const ticketId = 'ticketId';

      await expect(ticketRepository.getUserIdByTicketId(ticketId)).rejects.toThrow(
        'TICKET_REPOSITORY.METHOD_NOT_IMPLEMENTED',
      );
    });
  });
});
