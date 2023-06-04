class TicketRepository {
  async addTicket(payload, userId) {
    throw new Error('TICKET_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async findTicketById(ticketId, userId) {
    throw new Error('TICKET_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async findAllTicket(userAccess, query) {
    throw new Error('TICKET_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async updateStatusTicket(status, ticketId) {
    throw new Error('TICKET_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async verifyAvailableTicket(ticketId) {
    throw new Error('TICKET_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async verifyAccessTicket(ticketId, userId) {
    throw new Error('TICKET_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async deleteTicketById(ticketId) {
    throw new Error('TICKET_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getUserIdByTicketId(ticketId) {
    throw new Error('TICKET_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = TicketRepository;