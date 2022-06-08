import socketClient from "socket.io-client";

let socket;

export const connectWebSocket = async () => {
  await fetch("/api/socket");

  socket = socketClient();

  socket.on("connection", (data) => {
    console.log("succesfully connected with ws server", data);
    console.log(socket.id);
    socket.emit("register_user", "unknown");
  });

  socket.on("update_users", (data) => {
    console.log("update_users", JSON.parse(data));
  });

  socket.on("event", (data) => {});
};
