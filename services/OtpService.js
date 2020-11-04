
const config = require('config');
var Model = require('../models/index');
const twilio = require('twilio');
const appConstant = require("../constant");
const mongoose = require('mongoose');
const Handlebars = require('handlebars');
const client = twilio(config.get("twilioCredentials.accountSid"), config.get("twilioCredentials.authToken"));
const senderNumber=config.get("twilioCredentials.senderNumber");
const constant = appConstant.constant;

const sendSMS=async (countryCode,phoneNo,message)=>{
    return new Promise((resolve, reject) => {
        const smsOptions = {
            from: senderNumber,
            to: countryCode + phoneNo?phoneNo.toString():'',
            body: null,
          };
          smsOptions.body = message;
        client.messages.create(smsOptions);
        return resolve(message);
    });
};
const renderMessageFromTemplateAndVariables=async (templateData, variablesData)=> {
    return ;
}
const issue=async()=> {
    return (Math.floor(1000 + Math.random() * 9000)).toString();
}
const sendOtp=async (payload)=>{
    if(!payload.otpCode)
    payload.otpCode=Math.floor(1000 + Math.random() * 9000);
    if(payload.message){
        if(payload.variablesData)
        payload.variablesData.otpCode=payload.otpCode;
        else
        payload.variablesData={
            otpCode:payload.otpCode
        }
        payload.message =await renderMessageFromTemplateAndVariables(payload.message,payload.variablesData);
    }
    let otpData=await new Model.Otp(payload).save(); 
    await sendSMS(payload.countryCode,payload.phoneNo,payload.message);
    return payload;
}
const verify=async (payload)=> {
    if (payload.otpCode == '123456') {
       const eventType=payload.eventType || constant.SMS_EVENT_TYPE.SEND_OTP;
       const otpData=await Model.Otp.findOne({otpCode: payload.otpCode,eventType:eventType,
        phoneNo:payload.phoneNo,countryCode:payload.countryCode});
            if (!otpData) return false;
            await Model.Otp.deleteMany({_id:mongoose.Types.ObjectId(otpData._id)});
            return otpData;
    } else {
        const otpData=await Model.Otp.findOne({otpCode: payload.otpCode,
            phoneNo:payload.phoneNo,countryCode:payload.countryCode});
            console.log(otpData)
            if (!otpData) return false;
            await Model.Otp.deleteMany({_id:mongoose.Types.ObjectId(otpData._id)});
            return otpData;
            
    }
}
const sendSMSMessage=async (payload)=>{
    if(payload.countryCode && payload.phoneNo && payload.message)
    await sendSMS(payload.countryCode,payload.phoneNo,payload.message);
    return payload;
}
module.exports = {
    sendOtp:sendOtp,
    verify:verify,
    issue:issue,
    sendSMSMessage:sendSMSMessage,
    sendSMS:sendSMS
}