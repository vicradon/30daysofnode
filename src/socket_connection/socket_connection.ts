module.exports = (server: object) => {
  const io = require("socket.io")(server);

  io.on("connection", (socket: any) => {
    socket.on("send-message", (message: string) => {
      console.log(`${socket.id} sent ${message}`);
      socket.emit("new-message", {
        message,
      });
    });
  });
};
