/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const userRoutes = require('./interfaces/routes/userRouter');
const authenticationRoutes = require('./interfaces/routes/authenticationRouter');
const ticketRoutes = require('./interfaces/routes/ticketRouter');
const notificationRoutes = require('./interfaces/routes/notificationRouter');
const logger = require('./commons/middlewares/logs/logger');
const errorHandler = require('./commons/middlewares/error/errorHandler');
const connectDB = require('./infrastructures/database/db');

const app = express();
require('dotenv').config();
/** MIDDLEWARE */
app.use(cors());
app.use(morgan('combined', { stream: logger.stream }));
app.use(bodyParser.json());

/** ROUTES */
app.use('/api', userRoutes);
app.use('/api', authenticationRoutes);
app.use('/api', ticketRoutes);
app.use('/api', notificationRoutes);

/** ROUTE HANDLING ERROR */
app.use(errorHandler);

/** CONNECT TO MONGODB */
connectDB();

module.exports = app;
