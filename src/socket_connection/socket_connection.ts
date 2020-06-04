module.exports = (server) => {
  const io = require("socket.io")(server);

  io.on("connection", (socket) => {
    socket.on("send-message", (data) => {
      console.log(data);

      socket.emit("new-message", {
        message: data,
      });
    });
  });
};
