const { Server } = require("socket.io");

const WSUsers = new Map();

export default function socketHandler(req, res) {
  let io;
  if (res.socket.server.io) {
    io = res.socket.server.io;
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    io = new Server(res.socket.server);
    res.socket.server.io = io;
  }
  res.end();

  io.on("connection", (socket) => {
    console.log("new user connected", socket.id);
    socket.emit("connection", "connection successful");

    socket.on("register_user", (name) => {
      console.log("register user request", name);
      WSUsers.set(socket.id, { name, gameRoom: null, status: "free" });
      socket.broadcast.emit("update_users", JSON.stringify(WSUsers));
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
      WSUsers.delete(socket.id);
    });
  });
}
