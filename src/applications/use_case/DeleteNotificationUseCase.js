class DeleteNotificationUseCase {
  constructor({ notificationRepository }) {
    this._notificationRepository = notificationRepository;
  }

  async execute(notifId) {
    this._verifyParams(notifId);
    await this._notificationRepository.deleteNotificationById(notifId);
  }

  _verifyParams(notifId) {
    if (!notifId) {
      throw new Error('DELETE_NOTIFICATION_USE_CASE.NOT_COUNTAIN_NEEDED_PROPERTY');
    }

    if (typeof notifId !== 'string') {
      throw new Error('DELETE_NOTIFICATION_USE_CASE.PARAMS_NOT_MEET_DATA_TYPE_SPESIFICATION');
    }
  }
}

module.exports = DeleteNotificationUseCase;