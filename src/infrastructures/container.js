/* eslint-disable import/no-extraneous-dependencies */
const { createContainer, asClass } = require('awilix');

// service (repository, helper, manager, etc)
const UserRepositoryMongoDb = require('./repository/UserRepositoryMongoDB');
const TicketRepsositoryMongoDB = require('./repository/TicketRepositoryMongoDB');
const BcryptPasswordHash = require('./security/BcryptPasswordHash');
const EmailValidator = require('../domains/user/validators/EmailValidator');
const AuthenticationRepositoryMongoDB = require('./repository/AuthenticationRepositoryMongoDB');
const AuthenticationTokenManager = require('./security/JwtTokenManager');

// Use Case
const AddUserUseCase = require('../applications/use_case/AddUserUseCase');
const LoginUserUseCase = require('../applications/use_case/LoginUserUseCase');
const LogoutUserUseCase = require('../applications/use_case/LogoutUserUseCase');
const RefreshAuthenticationUseCase = require('../applications/use_case/RefreshAuthenticationUseCase');
const AddTicketUseCase = require('../applications/use_case/AddTicketUseCase');
const UpdateStatusTicketUseCase = require('../applications/use_case/UpdateStatusTicketUseCase');
const GetTicketUseCase = require('../applications/use_case/GetTicketUseCase');
const GetAllTicketUseCase = require('../applications/use_case/GetAllTicketUseCase');
const DeleteTicketUseCase = require('../applications/use_case/DeleteTicketUseCase');
const NotificationRepositoryMongoDB = require('./repository/NotificationRepositoryMongoDB');
const GetAllNotificationUseCase = require('../applications/use_case/GetAllNotificationUseCase');
const DeleteNotificationUseCase = require('../applications/use_case/DeleteNotificationUseCase');

const container = createContainer();

container.register({
  passwordHash: asClass(BcryptPasswordHash),
  emailValidator: asClass(EmailValidator),
  authenticationTokenManager: asClass(AuthenticationTokenManager),

  notificationRepository: asClass(NotificationRepositoryMongoDB),
  userRepository: asClass(UserRepositoryMongoDb),
  authenticationRepository: asClass(AuthenticationRepositoryMongoDB),
  ticketRepository: asClass(TicketRepsositoryMongoDB),

  deleteNotificationUseCase: asClass(DeleteNotificationUseCase),
  getAllNotificationUseCase: asClass(GetAllNotificationUseCase),
  deleteTicketUseCase: asClass(DeleteTicketUseCase),
  getAllTicketUseCase: asClass(GetAllTicketUseCase),
  getTicketUseCase: asClass(GetTicketUseCase),
  updateStatusTicketUseCase: asClass(UpdateStatusTicketUseCase),
  addTicketUseCase: asClass(AddTicketUseCase),
  addUserUseCase: asClass(AddUserUseCase),
  loginUserUseCase: asClass(LoginUserUseCase),
  logoutUserUseCase: asClass(LogoutUserUseCase),
  refreshAuthenticationUseCase: asClass(RefreshAuthenticationUseCase),
});
module.exports = container;