const user = require("./userSockets");
const driver = require("./driverSockets");
const Model = require("../models/index");
const io = require("socket.io");
const appConstant = require("../constant");
const constant = appConstant.constant;
const universalFunction = require("../lib/universal-function");
const userController = require("../v1/controllers/userController");
const pushNotificationService = require("../services/PushNotificationService");

var onlineUsers = [];
var socketUserId = [];
module.exports = io => {
  io.on("connection", socket => {
    console.log("connected to sockets");
    user(io, socket, onlineUsers, socketUserId);
    driver(io, socket, onlineUsers, socketUserId);
    admin(io, socket, onlineUsers, socketUserId);
    socket.on("disconnect", function() {
      let userId = socketUserId[socket.id];
      if(userId && onlineUsers[userId])
      delete onlineUsers[userId];
      if(socketUserId[socket.id])
      delete socketUserId[socket.id];
      console.log("Disconnect",socket.id,userId);
      socket.leave(userId);
    });
  });
  process.on("blockUser", function(data) {
    let obj = onlineUsers[data.userId];
    if (obj && obj.socketId) io.to(obj.socketId).emit("blockUser", data);
  });
  process.on("sendNotificationToDriver", async function(payloadData) {
    try {
      if (payloadData && payloadData.driverId) {
          payloadData.pushType = payloadData.pushType ? payloadData.pushType : 0;
          let lang = payloadData.lang || "en";
          let values = payloadData.values ? payloadData.values : {};
          let inputKeysObj = constant.PUSH_TYPE[payloadData.pushType];
          let eventType = payloadData.eventType || null;
          let data = await universalFunction.renderTemplateField(
            inputKeysObj,
            values,
            lang,
            eventType
          );
         io.to(payloadData.driverId).emit('sendNotificationToDriver', data);
       // pushNotificationService.preparePushNotifiction(payloadData, "driver");
      }
    } catch(err) {
      console.log(err)
    }
  });
  process.on("sendNotificationToUser", async function(payloadData) {
    try {
    if (payloadData && payloadData.userId) {
        payloadData.pushType = payloadData.pushType ? payloadData.pushType : 0;
        let lang = payloadData.lang || "en";
        let values = payloadData.values ? payloadData.values : {};
        let inputKeysObj = constant.PUSH_TYPE[payloadData.pushType];
        let eventType = payloadData.eventType || null;
        let data = await universalFunction.renderTemplateField(
          inputKeysObj,
          values,
          lang,
          eventType
        );
        io.to(payloadData.userId).emit('sendNotificationToUser', data);
     // pushNotificationService.preparePushNotifiction(payloadData, "user");
    }
  } catch(err) {
    console.log(err)
  }
  });
};
