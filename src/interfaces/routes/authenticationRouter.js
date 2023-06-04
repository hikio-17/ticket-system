const express = require('express');

const router = express.Router();
const container = require('../../infrastructures/container');
const AuthenticationController = require('../controllers/AuthenticationController');

const authenticationController = new AuthenticationController(container);

router.post('/authentications', authenticationController.userLogin);
router.put('/authentications', authenticationController.userEditToken);
router.delete('/authentications', authenticationController.userLogout);

module.exports = router;
