const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const usersRouter = require('./users/users-router.js');

const server = express();

// global middleware
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

server.use('/api/users', usersRouter);

module.exports = server;