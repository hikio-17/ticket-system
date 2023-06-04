/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-const */
const { convertDate } = require('../../commons/date/convertDate');
const NotificationRepository = require('../../domains/notifications/NotificationRepository');
const Notification = require('../database/models/Notification');

class NotificationRepositoryMongoDB extends NotificationRepository {
  async sendNotification({ userId, status, ticketId }) {
    const message = `Tiket dengan ID ${ticketId} telah diperbarui. Status: ${status}`;
    await Notification.create({
      userId,
      ticketId,
      status,
      message,
    });
  }

  async getAllNotification(userId) {
    let notifications = await Notification.find({ userId }).sort({ createdAt: -1 }).select('-_id');

    notifications = notifications.map((notification) => (
      {
        ...notification._doc,
        createdAt: convertDate(notification.createdAt),
      }
    ));

    return notifications;
  }

  async deleteNotificationById(id) {
    await Notification.findByIdAndDelete(id);
  }
}

module.exports = NotificationRepositoryMongoDB;