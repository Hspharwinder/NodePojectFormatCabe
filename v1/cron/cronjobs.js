
const appConstant = require('../../constant');
const moment=require('moment');
const Model = require('../../models/index');
const Service = require('../../services/index');
const mongoose = require('mongoose');
const request = require('request');
const statusCodeList = require("../../statusCodes");
const constant = appConstant.constant;
const statusCode = statusCodeList.statusCodes.STATUS_CODE;

const Agenda = require('agenda');
exports.startCronJobs=startCronJobs;

const agenda = new Agenda({db: {address:'mongodb://localhost:27017/akab',collection: 'scheduledevents'}});
const deleteOtp=async function(otpId){
    try {
        await Model.Otp.deleteOne({_id:mongoose.Types.ObjectId(otpId)})
        return true;
    } catch (error) {
        return true;
    }
}
agenda.define('deleteOtp', async job => {
    const otpData=job.attrs.data;
    if(otpData && otpData.otpId){
        let bool=await deleteOtp(otpData.otpId);
        if(bool){
            job.remove(function(err) {
                if(!err) console.log("Successfully removed sms otp from collection");
            })
        }
    }
});

async function startCronJobs(){
    await agenda.start();
    
}
process.on('deleteOtp',async(otpData)=>{
    await agenda.schedule('in 2 minutes', 'deleteOtp', {otpId:otpData._id})
})

process.on('scheduleBooking',async(otpData)=>{
    await agenda.schedule('in 2 minutes', 'deleteOtp', {otpId:otpData._id})
})