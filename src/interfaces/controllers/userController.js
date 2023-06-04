/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const asyncHandler = require('express-async-handler');

class UserController {
  constructor(container) {
    this._container = container;
  }

  userRegister = asyncHandler(async (req, res) => {
    const addUserUseCase = this._container.resolve('addUserUseCase');
    const addedUser = await addUserUseCase.execute(req.body);
    res.status(201).json({
      status: 'success',
      message: 'User registered successfuly',
      data: {
        addedUser,
      },
    });
  });
}

module.exports = UserController;