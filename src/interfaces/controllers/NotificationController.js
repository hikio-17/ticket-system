const asyncHandler = require('express-async-handler');

class NotificationController {
  constructor(container) {
    this._container = container;
  }

  getAllNotification = asyncHandler(async (req, res) => {
    const getAllNotificationUseCase = this._container.resolve('getAllNotificationUseCase');
    const notifications = await getAllNotificationUseCase.execute(req.user.userId);

    res.status(200).json({
      status: 'success',
      data: {
        notifications,
      },
    });
  });

  deleteNotificationById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deleteNotificationUseCase = this._container.resolve('deleteNotificationUseCase');
    await deleteNotificationUseCase.execute(id);

    res.status(200).json({
      status: 'success',
      message: 'Notif berhasil dihapus',
    });
  });
}

module.exports = NotificationController;