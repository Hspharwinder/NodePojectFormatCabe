const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var vehicleModel = new Schema({
    driverId:  { type: Schema.ObjectId, ref: 'Driver' },
    vehicleCategoryId: { type: Schema.ObjectId, ref: 'VehicleCategory' },
    vehicleName: { type: String, default: '' },
    vehicleMake: { type: String ,default: ''},
    vehicleNumber: { type: String ,default: ''},
    vehicleImage: { type: String ,default: ''},
    vehicleYear: { type: String ,default: ''},
    insuranceDocument:{ type: String ,default: null},
    registrationCertificate:{ type: String ,default: null},
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true })

vehicleModel.set('toObject', { virtuals: true });
vehicleModel.set('toJSON', { virtuals: true });


module.exports = mongoose.model('vehicle', vehicleModel);