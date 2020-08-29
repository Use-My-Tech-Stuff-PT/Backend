const express = require('express');
// const cors = require('cors');
const helmet = require('helmet');

const UsersRouter = require('./users/users-router.js');
const ItemsRouter = require('./items/items-router.js');

const server = express();



server.use(helmet());
// server.use(cors());
server.use(express.json());

// server.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });

server.use("/", express.static(__dirname + "/documentation"));

server.use('/api/users', UsersRouter);
server.use('/api/items', ItemsRouter);

// server.options('/api/items/:id', cors()) // enable pre-flight request for delete
// server.put('/api/items/:id', cors(), function (req, res, next){
//     res.json({msg: 'This is CORS-enabled for all origins!'})
// });

server.get('/', function (req, res) {
    res.sendfile(__dirname + './documentation/index.html');
});

module.exports = server;