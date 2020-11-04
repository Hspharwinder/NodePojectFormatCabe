const Constaconstantnt = require("../constant");
const Model = require("../models/index");
const userController = require("../v1/controllers/userController");

module.exports = (io, socket, onlineUsers, socketUserId) => {
  socket.on("onlineUser", function(data) {
    try {
      let obj = { userId: data.userId, socketId: socket.id, type: "user" };
      console.log(obj, "user connection user id");
      onlineUsers[data.userId] = obj;
      socketUserId[socket.id] = data.userId;
      io.to(socket.id).emit("onlineUserOk", { status: 200 });
      socket.join(data.userId);
    } catch (error) {}
  });
  socket.on("updateLatLong", function(data) {
    if (data && data.userId) {
      data.status = 200;
      let obj = onlineUsers[data.userId];
      if (obj && obj.socketId)
        io.to(obj.socketId).emit("updateLatLongSuccessfully", data);
    }
  });
};
