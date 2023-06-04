const NewTicket = require('../../domains/ticket/entities/NewTicket');

class AddTicketUseCase {
  constructor({ ticketRepository }) {
    this._ticketRepository = ticketRepository;
  }

  async execute(useCasePayload, credentialId) {
    this._verifyCredentialId(credentialId);
    const newTicket = new NewTicket(useCasePayload);

    return this._ticketRepository.addTicket(newTicket, credentialId);
  }

  _verifyCredentialId(credentialId) {
    if (!credentialId) {
      throw new Error('ADD_TICKET_USE_CASE.NOT_COUNTAIN_CREDENTIAL_ID');
    }

    if (typeof credentialId !== 'string') {
      throw new Error('ADD_TICKET_USE_CASE.CREDENTIAL_ID_NOT_MEET_DATA_TYPE_SPESIFICATION');
    }
  }
}

module.exports = AddTicketUseCase;