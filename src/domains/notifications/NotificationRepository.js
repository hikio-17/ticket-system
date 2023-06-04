class NotificationRepository {
  async sendNotification({ userId, status, ticketId }) {
    throw new Error('NOTIFICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getAllNotification(userId) {
    throw new Error('NOTIFICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async deleteNotificationById(id) {
    throw new Error('NOTIFICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = NotificationRepository;