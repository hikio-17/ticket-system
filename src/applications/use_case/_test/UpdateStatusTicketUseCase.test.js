const UpdateStatusTicketUseCase = require('../UpdateStatusTicketUseCase');
const TicketRepository = require('../../../domains/ticket/TicketRepository');
const NotificationRepository = require('../../../domains/notifications/NotificationRepository');
const UpdateStatusTicket = require('../../../domains/ticket/entities/UpdateStatusTicket');

describe('UpdateStatusTicketUseCase', () => {
  let updateStatusTicketUseCase;
  let ticketRepositoryMock;
  let notificationRepositoryMock;

  beforeEach(() => {
    ticketRepositoryMock = new TicketRepository();
    notificationRepositoryMock = new NotificationRepository();
    updateStatusTicketUseCase = new UpdateStatusTicketUseCase({
      ticketRepository: ticketRepositoryMock,
      notificationRepository: notificationRepositoryMock,
    });
  });

  describe('execute', () => {
    it('should throw an error if ticketId is not provided', async () => {
      const useCasePayload = {

      };
      const ticketId = undefined;

      await expect(updateStatusTicketUseCase.execute(useCasePayload, ticketId)).rejects.toThrow(
        'UPDATE_STATUS_TICKET_USE_CASE.NOT_CONTAIN_NEEDED_PROPERTY',
      );
    });

    it('should throw an error if ticketId is not a string', async () => {
      const useCasePayload = {
        ticketId: 123,
      };
      const ticketId = 12345;

      await expect(updateStatusTicketUseCase.execute(useCasePayload, ticketId)).rejects.toThrow(
        'UPDATE_STATUS_TICKET_USE_CASE.TICKET_ID_NOT_MEET_DATA_TYPE_SPECIFICATION',
      );
    });

    // it('should update the status and send a notification', async () => {
    //   const ticketId = 'ticketId';
    //   const userId = 'userId';
    //   const status = 'sedang dalam proses';

    //   const verifyAvailableTicketSpy = jest
    //     .spyOn(ticketRepositoryMock, 'verifyAvailableTicket')
    //     .mockImplementation(() => Promise.resolve());
    //   const getUserIdByTicketIdSpy = jest
    //     .spyOn(ticketRepositoryMock, 'getUserIdByTicketId')
    //     .mockImplementation(() => Promise.resolve(userId));
    //   const updateStatusTicketSpy = jest
    //     .spyOn(ticketRepositoryMock, 'updateStatusTicket')
    //     .mockImplementation(() => Promise.resolve());
    //   const sendNotificationSpy = jest
    //     .spyOn(notificationRepositoryMock, 'sendNotification')
    //     .mockImplementation(() => Promise.resolve());

    //   await updateStatusTicketUseCase.execute(status, ticketId);

    //   expect(verifyAvailableTicketSpy).toHaveBeenCalledWith(ticketId);
    //   expect(getUserIdByTicketIdSpy).toHaveBeenCalledWith(ticketId);
    //   expect(updateStatusTicketSpy).toHaveBeenCalledWith(status, ticketId);
    //   expect(sendNotificationSpy).toHaveBeenCalledWith({ userId, status, ticketId });

    //   verifyAvailableTicketSpy.mockRestore();
    //   getUserIdByTicketIdSpy.mockRestore();
    //   updateStatusTicketSpy.mockRestore();
    //   sendNotificationSpy.mockRestore();
    // });
  });
});
