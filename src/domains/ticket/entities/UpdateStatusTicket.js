/* eslint-disable consistent-return */
class UpdateStatusTicket {
  constructor(payload) {
    this._verifyPayload(payload);
    this.status = payload.status;
  }

  _verifyPayload(payload) {
    const { status } = payload;

    if (!status) {
      throw new Error('UPDATE_STATUS_TICKET.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof status !== 'string') {
      throw new Error('UPDATE_STATUS_TICKET.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    if (status !== 'menunggu tindakan' && status !== 'sedang dalam proses' && status !== 'sedang direspon' && status !== 'telah selesai') {
      throw new Error('UPDATE_STATUS_TICKET.PAYLOAD_NOT_MEET_DATA_OPTIONS');
    }
  }
}

module.exports = UpdateStatusTicket;