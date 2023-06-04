class GetAllTicketUseCase {
  constructor({ ticketRepository }) {
    this._ticketRepository = ticketRepository;
  }

  async execute(userAccess, query) {
    this._verifyPayloadUserAccess(userAccess);

    return this._ticketRepository.findAllTicket(userAccess, query);
  }

  _verifyPayloadUserAccess(userAccess) {
    if (!userAccess) {
      throw new Error('GET_ALL_TICKET_USE_CASE.NOT_COUNTAIN_NEEDED_PROPERTY');
    }

    if (typeof userAccess !== 'object') {
      throw new Error('GET_ALL_TICKET_USE_CASE.USER_ACCESS_NOT_MEET_DATA_TYPE_SPESIFICATION');
    }
  }
}

module.exports = GetAllTicketUseCase;