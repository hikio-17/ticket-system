/* eslint-disable radix */
const { Lifetime } = require('awilix');
const { converDate, convertDate } = require('../../commons/date/convertDate');
const AuthorizationError = require('../../commons/exceptions/AuthorizationError');
const NotFoundError = require('../../commons/exceptions/NotFoundError');
const TicketRepository = require('../../domains/ticket/TicketRepository');
const Ticket = require('../database/models/Ticket');

class TicketRepsositoryMongoDB extends TicketRepository {
  async addTicket({ title, description, priority }, userId) {
    const priorityTicket = ['critical', 'high', 'medium', 'low'];
    const ticket = await Ticket.create({
      title,
      description,
      priority: priority.toLowerCase(),
      priorityIndex: priorityTicket.indexOf(priority),
      createdBy: userId,
    });

    return {
      _id: ticket._id,
      title: ticket.title,
      createdBy: ticket.createdBy,
    };
  }

  async verifyAvailableTicket(ticketId) {
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      throw new NotFoundError('Tiket tidak ditemukan');
    }
  }

  async findTicketById(ticketId) {
    const ticket = await Ticket.findOne({ _id: ticketId }).populate('createdBy', '_id username email');
    return {
      ...ticket._doc,
      createdAt: convertDate(ticket.createdAt),
      updatedAt: convertDate(ticket.updatedAt),
    };
  }

  async verifyAccessTicket(ticketId, user) {
    const ticket = await Ticket.findOne({ _id: ticketId });
    console.log(user.userId);
    console.log(ticket.createdBy.toString());
    if (ticket.createdBy.toString() !== user.userId && user.role !== 'admin') {
      throw new AuthorizationError('Anda tidak dapat mengakses resource ini');
    }

    return true;
  }

  async updateStatusTicket(status, ticketId) {
    await Ticket.updateOne({ _id: ticketId }, { $set: { status } });
  }

  async findAllTicket({ userId, role }, query) {
    const { keyword, page, limit } = query;

    // search query
    const searchQuery = keyword ? {
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
      ],
    } : {};

    // mengatur paginasi
    const currentPage = parseInt(page) || 1;
    const perPage = parseInt(limit) || 4;
    const skip = (currentPage - 1) * perPage;

    let tickets = await Ticket.find()
      .select('-priorityIndex')
      .sort({ priorityIndex: 1 }).populate('createdBy', '_id username')
      .skip(skip)
      .limit(perPage)
      .exec();

    if (role === 'user') {
      tickets = await Ticket.find({ createdBy: userId })
        .select('-priorityIndex')
        .sort({ timestamp: -1 }).populate('createdBy', '_id username email')
        .skip(skip)
        .limit(perPage)
        .exec();
    }
    return tickets;
  }

  async getUserIdByTicketId(ticketId) {
    const ticket = await Ticket.findOne({ _id: ticketId });
    return ticket.createdBy.toString();
  }

  async deleteTicketById(ticketId) {
    await Ticket.findByIdAndRemove(ticketId);
  }
}

module.exports = TicketRepsositoryMongoDB;