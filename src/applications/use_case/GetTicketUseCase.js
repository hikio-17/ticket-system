class GetTicketUseCase {
  constructor({ ticketRepository }) {
    this._ticketRepository = ticketRepository;
  }

  async execute(ticketId, userAccess) {
    this._verifyParams(ticketId, userAccess);

    await this._ticketRepository.verifyAvailableTicket(ticketId);
    await this._ticketRepository.verifyAccessTicket(ticketId, userAccess);
    return this._ticketRepository.findTicketById(ticketId);
  }

  _verifyParams(ticketId, userAccess) {
    if (!ticketId || !userAccess) {
      throw new Error('GET_TICKET_USE_CASE.NOT_COUNTAIN_NEEDED_PROPERTY');
    }

    if (typeof ticketId !== 'string' || typeof userAccess !== 'object') {
      throw new Error('GET_TICKET_USE_CASE.PARAMS_NOT_MEET_DATA_TYPE_SPESIFICATION');
    }
  }
}

module.exports = GetTicketUseCase;