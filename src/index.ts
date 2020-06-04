const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const socketConnection = require("./socket_connection/socket_connection");
require("dotenv").config();

const handleError = require("./middleware/error");
socketConnection(server);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(handleError);
server.listen(process.env.PORT);
console.log(`Server running at http://localhost:${process.env.PORT}/`);
