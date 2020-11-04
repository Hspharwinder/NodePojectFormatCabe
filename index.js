const express = require('express');
const path = require('path');
const fs =require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('config');
const connection = require('./connection/connect');
const route = require('./route');
const universalFunction = require('./lib/universal-function');
const app = express();
const morgan = require('morgan')
const socket = require('./sockets/index');
const cronJob=require('./v1/cron/cronjobs');
const statusCodeList = require("./statusCodes");
const statusCode = statusCodeList.statusCodes.STATUS_CODE;

let https =require('http');
let server=null;
server = https.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use('/api', route);
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use('/static', express.static(path.join(__dirname, './uploads/')));

app.use((error,req,res,next)=>{
      if(error)
      return universalFunction.sendErrorResponse(req, res, statusCode.BAD_REQUEST, error);
      next();
});

const io = require('socket.io')(server)
socket(io)
server.listen(config.get('port'),async () => {
  console.log(`Node env :${process.env.NODE_ENV}.`);
  console.log(`Running on port: ${config.get('port')}.`);
  await connection.mongoDbconnection();
  //cronJob.startCronJobs();
});
