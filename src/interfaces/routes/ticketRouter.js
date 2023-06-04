const express = require('express');
const container = require('../../infrastructures/container');
const TicketController = require('../controllers/TicketController');
const { authCheck, adminCheck } = require('../../commons/middlewares/auth');

const router = express.Router();
const ticketController = new TicketController(container);

router.get('/tickets', authCheck, ticketController.getAllTicket);
router.get('/tickets/:id', authCheck, ticketController.getTicketById);
router.post('/tickets', authCheck, ticketController.addTicket);
router.put('/tickets/:id', authCheck, adminCheck, ticketController.updateStatusTicket);
router.delete('/tickets/:id', authCheck, ticketController.deleteTicketById);

module.exports = router;