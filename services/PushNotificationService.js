const config = require('config');
const FCM = require('fcm-node');
const Model = require('../models/index');
const appConstant = require("../constant");
const universalFunction = require('../lib/universal-function');
const constant = appConstant.constant;

exports.sendAndroidPushNotifiction=sendAndroidPushNotifiction;
exports.sendIosPushNotification=sendIosPushNotification;
exports.preparePushNotifiction=preparePushNotifiction;
exports.sendWebPushNotifiction=sendWebPushNotifiction;
exports.sendPushNotifictionAccordingToDevice=sendPushNotifictionAccordingToDevice;

async function sendAndroidPushNotifiction(payload){

    let fcm = new FCM(config.get("fcmKeyUser.android"));
    payload.pushType=payload.pushType?payload.pushType:0;
    let lang=payload.lang || 'en';
    let values=payload.values?payload.values:{};
    let inputKeysObj=constant.PUSH_TYPE[payload.pushType];
    let data=await universalFunction.renderTemplateField(inputKeysObj,values,lang);
    var message = {
        to: payload.deviceToken || '',
        collapse_key:'U2GO',
        data:data,
    };
    
    if(payload.isUserNotification && payload.isNotificationSave){
      new Model.UserNotification(payload).save();
    }
    if(payload.isDriverNotification && payload.isNotificationSave){
      new Model.DriverNotification(payload).save();
    }
    fcm.send(message, (err, response) => {
        if (err) {
            console.log('Something has gone wrong!',err);
        } else {
            console.log('Push successfully sent!');
        }
    });
}
async function sendIosPushNotification(payload) {
  
  let fcm = new FCM(config.get("fcmKeyUser.ios"));
  payload.pushType=payload.pushType?payload.pushType:0;
  let lang=payload.lang || 'en';
  let values=payload.values?payload.values:{};
  let inputKeysObj=constant.PUSH_TYPE[payload.pushType];
  let data=await universalFunction.renderTemplateField(inputKeysObj,values,lang);
    
  var message = {
      to: payload.deviceToken || '',
      collapse_key:'U2GO',
      notification: {
        title: data.title || '',
        body: data.message || '',
        sound:'default'
      },
      data:data || {}
  };
  
  if(payload.isUserNotification && payload.isNotificationSave){
    new Model.UserNotification(payload).save();
  }
  if(payload.isDriverNotification && payload.isNotificationSave){
    new Model.DriverNotification(payload).save();
  }
  fcm.send(message, (err, response) => {
      if (err) {
    console.log('Something has gone wrong! IOS',err);
      } else {
         console.log('Push successfully sent! IOS');
      }
  });
}
async function sendWebPushNotifiction(payload){

  let fcm = new FCM(config.get("fcmKeyUser.android"));
  payload.pushType=payload.pushType?payload.pushType:0;
  let lang=payload.lang || 'en';
  let values=payload.values?payload.values:{};
  let inputKeysObj=constant.PUSH_TYPE[payload.pushType];
  let data=await universalFunction.renderTemplateField(inputKeysObj,values,lang);
  var message = {
      to: payload.deviceToken || '',
      collapse_key:'U2GO',
      data:data,
      notification: {
        title: data.title || '',
        body: data.message || ''
    }
  };
  
  if(payload.isUserNotification && payload.isNotificationSave){
    new Model.UserNotification(payload).save();
  }
  
  fcm.send(message, (err, response) => {
      if (err) {
     console.log('Something has gone wrong!',err);
      } else {
         console.log('Push successfully sent!');
      }
  });
}
async function sendPushNotifictionAccordingToDevice(deviceData, payload){
  let deviceToken = deviceData.deviceToken;
  let deviceType = deviceData.deviceType;
  payload.deviceToken = deviceToken;
  switch(deviceType) {
    case 'ANDROID':
      sendAndroidPushNotifiction(payload);
      break;
    case 'IOS':
      sendIosPushNotification(payload);
      break;
    case 'WEB':
      sendWebPushNotifiction(payload);
      break;
    default:
      console.log('Invalid device type');
      break;
  }
  return true;
}
async function preparePushNotifiction(payload, userType){
  if (userType == 'driver') {
    const deviceData = await Model.Device.findOne({
      driverId: payload.driverId
    })
    if (deviceData) {
      sendPushNotifictionAccordingToDevice(deviceData, payload);
    } else {
      console.log('No driver device data found.')
    }
  } else if (userType == 'user') {
    const deviceData = await Model.Device.findOne({
      userId: payload.userId
    })
    if (deviceData) {
      sendPushNotifictionAccordingToDevice(deviceData, payload);
    } else {
      console.log('No user device data found.')
    }
    
  }
}
