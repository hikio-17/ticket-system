const express = require('express');
const NotificationController = require('../controllers/NotificationController');
const container = require('../../infrastructures/container');
const { authCheck } = require('../../commons/middlewares/auth');

const router = express.Router();
const notificationController = new NotificationController(container);

router.get('/notifications', authCheck, notificationController.getAllNotification);
router.delete('/notifications/:id', authCheck, notificationController.deleteNotificationById);

module.exports = router;