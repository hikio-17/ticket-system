const asyncHandler = require('express-async-handler');

class AuthenticationController {
  constructor(container) {
    this._container = container;
  }

  userLogin = asyncHandler(async (req, res) => {
    const loginUserUseCase = this._container.resolve('loginUserUseCase');
    const data = await loginUserUseCase.execute(req.body);

    res.status(201).json({
      status: 'success',
      data,
    });
  });

  userEditToken = asyncHandler(async (req, res) => {
    const refreshAuthenticationUseCase = this._container.resolve('refreshAuthenticationUseCase');
    const accessToken = await refreshAuthenticationUseCase.execute(req.body);

    res.status(200).json({
      status: 'success',
      data: {
        accessToken,
      },
    });
  });

  userLogout = asyncHandler(async (req, res) => {
    const logoutUserUseCase = this._container.resolve('logoutUserUseCase');
    await logoutUserUseCase.execute(req.body);

    res.status(200).send({
      status: 'success',
    });
  });
}

module.exports = AuthenticationController;