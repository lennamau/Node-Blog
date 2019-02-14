const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const usersRouter = require('./users/users-router.js');

const server = express();

// global middleware
server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan('dev'));

server.use('/api/users', usersRouter);


module.exports = server;