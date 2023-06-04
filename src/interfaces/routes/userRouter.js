const express = require('express');
const container = require('../../infrastructures/container');
const UserController = require('../controllers/userController');

const router = express.Router();

const userController = new UserController(container);

router.post('/users', userController.userRegister);

module.exports = router;