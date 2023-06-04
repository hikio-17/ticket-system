const asyncHandler = require('express-async-handler');

class TicketController {
  constructor(container) {
    this._container = container;
  }

  addTicket = asyncHandler(async (req, res) => {
    const { userId } = req.user;
    const addTicketUseCase = this._container.resolve('addTicketUseCase');
    const addedTicket = await addTicketUseCase.execute(req.body, userId.toString());

    res.status(201).json({
      status: 'success',
      data: {
        addedTicket,
      },
    });
  });

  getTicketById = asyncHandler(async (req, res) => {
    const { id: ticketId } = req.params;
    const getTicketUseCase = this._container.resolve('getTicketUseCase');
    const ticket = await getTicketUseCase.execute(ticketId, req.user);

    res.status(200).json({
      status: 'success',
      data: {
        ticket,
      },
    });
  });

  getAllTicket = asyncHandler(async (req, res) => {
    const getAllTicketUseCase = this._container.resolve('getAllTicketUseCase');
    const tickets = await getAllTicketUseCase.execute(req.user, req.query);

    res.status(200).json({
      status: 'success',
      data: {
        tickets,
      },
    });
  });

  updateStatusTicket = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateStatusTicketUseCase = this._container.resolve('updateStatusTicketUseCase');
    await updateStatusTicketUseCase.execute(req.body, id);

    res.status(200).json({
      status: 'success',
      message: 'Status ticket berhasil diperbarui',
    });
  });

  deleteTicketById = asyncHandler(async (req, res) => {
    const { id: ticketId } = req.params;
    const deleteTicketUseCase = this._container.resolve('deleteTicketUseCase');
    await deleteTicketUseCase.execute(ticketId, req.user);

    res.status(200).json({
      status: 'success',
      message: `Ticket dengan id '${ticketId}' berhasil dihapus`,
    });
  });
}

module.exports = TicketController;