const express = require('express');
const server = express();
const cors = require('cors');
//middle ware
server.use(cors());
server.use(express.json());





module.exports = server;