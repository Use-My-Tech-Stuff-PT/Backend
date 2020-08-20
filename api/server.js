const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const UsersRouter = require('../users/users-router.js');
const ItemsRouter = require('../items/items-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/users', UsersRouter);
server.use('/api/items', ItemsRouter);

server.get('/', (req, res) => {
    res.json({ api: 'up' });
});

module.exports = server;