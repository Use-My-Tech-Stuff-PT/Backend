const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const UsersRouter = require('./users/users-router.js');
const ItemsRouter = require('./items/items-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/", express.static(__dirname + "/documentation"));

server.use('/api/users', UsersRouter);
server.use('/api/items', ItemsRouter);

server.get('/', function (req, res) {
    res.sendfile(__dirname + './documentation/index.html');
});

module.exports = server;