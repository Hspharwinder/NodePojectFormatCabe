const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

var VehicleCategoryModel= new Schema({
    vehicleCategory: { type: String, default: '' },
    vehicleImage:{ type: String, default: null },
    packageSizeId: [
        { type: Schema.ObjectId, ref: 'PackageSize' },
    ],
    isDelivery: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true })

VehicleCategoryModel.set('toObject', { virtuals: true });
VehicleCategoryModel.set('toJSON', { virtuals: true });


module.exports = mongoose.model('VehicleCategory', VehicleCategoryModel);