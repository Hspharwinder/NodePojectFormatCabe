const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DriverDocumentModel = new Schema({
    driverId: { type: Schema.ObjectId, ref: 'Driver' },
    driverImage:{ type: String ,default: null},
    documentImage:{ type: String ,default: null},
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});
const DriverDocument = mongoose.model('DriverDocument', DriverDocumentModel);
module.exports = DriverDocument;
