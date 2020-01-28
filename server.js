const express = require('express');
const server = express();
const cors = require('cors');
const userRouter = require('./users/users-router.js');
//middle ware
server.use(cors());
server.use(express.json());


server.get('/', (req, res) => {
    res.status(200).json({msg:'Server up and running!'})
});

server.use('/api/users', userRouter);




module.exports = server;