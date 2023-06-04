class NewTicket {
  constructor(payload) {
    this._verifyPayload(payload);
    const { title, description, priority } = payload;
    this.title = title;
    this.description = description;
    this.priority = priority || 'low';
  }

  _verifyPayload(payload) {
    const { title, description } = payload;

    if (!title || !description) {
      throw new Error('NEW_TICKET.NOT_COUNTAIN_NEEDED_PROPERTY');
    }

    if (typeof title !== 'string' || typeof description !== 'string') {
      throw new Error('NEW_TICKET.PAYLOAD_NOT_MEET_DATA_TYPE_SPESIFICATION');
    }
  }
}

module.exports = NewTicket;