const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OtpModel = new Schema({
    otpCode: {
        type: String
    },
    customerId:  { type: Schema.ObjectId, ref: 'Customer' },
    driverId:  { type: Schema.ObjectId, ref: 'Driver' },
    phoneNo : {
        type : String
    },
    countryCode:{
        type : String
    }
}, {
    timestamps: true
});
module.exports = mongoose.model("Otp", OtpModel);
