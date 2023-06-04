class GetAllNotificationUseCase {
  constructor({ notificationRepository }) {
    this._notificationRepository = notificationRepository;
  }

  async execute(userId) {
    this._verifyParams(userId);
    return this._notificationRepository.getAllNotification(userId);
  }

  _verifyParams(userId) {
    if (!userId) {
      throw new Error('GET_ALL_NOTIFICATION_USE_CASE.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof userId !== 'string') {
      throw new Error('GET_ALL_NOTIFICATION_USE_CASE.PARAMS_NOT_MEET_DATA_TYPE_SPESIFICATION');
    }
  }
}

module.exports = GetAllNotificationUseCase;