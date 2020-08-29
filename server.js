const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const UsersRouter = require('./users/users-router.js');
const ItemsRouter = require('./items/items-router.js');

const server = express();

server.use(cors());
server.use(express.json());

server.use(function (req, res, next) {
    console.log('Yoooo')
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-Withm Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

server.use("/", express.static(__dirname + "/documentation"));

server.use('/api/users', UsersRouter);
server.use('/api/items', ItemsRouter);


server.get('/', function (req, res) {
    res.sendfile(__dirname + './documentation/index.html');
});

module.exports = server;