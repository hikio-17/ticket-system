const NotificationRepository = require('../NotificationRepository');

describe('NotificationRepository', () => {
  let notificationRepository;

  beforeEach(() => {
    notificationRepository = new NotificationRepository();
  });

  describe('sendNotification', () => {
    it('should throw an error when sendNotification method is called', async () => {
      const notificationData = {
        userId: 'userId',
        status: 'status',
        ticketId: 'ticketId',
      };

      await expect(notificationRepository.sendNotification(notificationData)).rejects.toThrow(
        'NOTIFICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED',
      );
    });
  });

  describe('getAllNotification', () => {
    it('should throw an error when getAllNotification method is called', async () => {
      const userId = 'userId';

      await expect(notificationRepository.getAllNotification(userId)).rejects.toThrow(
        'NOTIFICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED',
      );
    });
  });

  describe('deleteNotificationById', () => {
    it('should throw an error when deleteNotificationById method is called', async () => {
      const id = 'notificationId';

      await expect(notificationRepository.deleteNotificationById(id)).rejects.toThrow(
        'NOTIFICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED',
      );
    });
  });
});
