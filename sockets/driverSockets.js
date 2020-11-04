const Constaconstantnt = require('../constant');
const Model = require('../models/index');
const universalFunction = require('../lib/universal-function');
const DriverController = require('../v1/controllers/DriverController');

module.exports =  (io,socket,onlineUsers,socketUserId)=>{
  socket.on("onlineDriver", function(data) {
    try {
      let obj = { userId: data.driverId, socketId: socket.id,type:'driver' };
      console.log(obj, "connection driver id");
      onlineUsers[data.driverId] = obj;
      socketUserId[socket.id]=data.driverId;
      io.to(socket.id).emit("onlineDriverOk", { status: 200 });
      socket.join(data.driverId);
    } catch (error) {
      console.log(error);
    }
  });
  socket.on("updateLatLong",async function (data) {
    if(data && data.driverId && data.latitude && data.longitude){
      data.status=200;
      await DriverController.updateDriverLongLat(data);
      io.to(data.driverId).emit('updateLatLongSuccessfully',data);
      if(data.userId != '' && data.userId != null ) {
        io.to(data.userId).emit('updateDriverLatLongToUser',data);
      }
    }
  });
}