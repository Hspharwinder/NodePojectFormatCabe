const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DriverSchema = new Schema(
    {
        vehicleId: { type: Schema.ObjectId, ref: "vehicle" },
        VehicleCategoryId: { type: Schema.ObjectId, ref: "VehicleCategory" },
        firstName: { type: String, default: null },
        lastName: { type: String, default: null },
        email: { type: String, index: true, default: null },
        phoneNo: { type: String, index: true, default: null },
        countryCode: { type: String, index: true, default: null },
        password: { type: String, index: true, default: null },
        country: { type: String, default: null },
        state: { type: String, default: null },
        city: { type: String, default: null },
        image: { type: String, default: null },
        freeLancingDriver: { type: Boolean, default: false},
        businessOwner: {type: Boolean, default: false},
        accessToken: { type: String, index: true, default: "" },
        deviceId: { type: String, default: "" },
        deviceToken: { type: String, default: "" },
        resetToken: { type: String, default: "" },
        resetTokenDate: { type: Date, default: "" },
        isPhoneVerified: { type: Boolean, default: false },
        verficationService: {
        type: String,
        enum: ["EMAIL", "SMS", "DEFAULT"],
        default: "DEFAULT"
        },
        isActive: { type: Boolean, default: true },
        isUploadDocument: {type: Boolean, default:false},
        isBlocked: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false },
        isUploadDocument: { type: Boolean, default: false },
        isUploadVehicleDetails: { type: Boolean, default: false },
    },
    { timestamps: true }
);
DriverSchema.set("toJSON", {
    transform: function (doc, ret, option) {
        delete ret.password;
        delete ret.__v;
    },
});

DriverSchema.methods.authenticate = function (password, cb) {
    const promise = new Promise((resolve, reject) => {
        if (!password) reject(new Error("MissingPasswordError"));

        bcrypt.compare(password, this.password, (error, result) => {
            if (!result) reject(new Error("WrongPassword"));
            resolve(this);
        });
    });

    if (!cb) return promise;
    promise.then((result) => cb(null, result)).catch((err) => cb(err));
};

DriverSchema.methods.setPassword = function (password, cb) {
    const promise = new Promise((resolve, reject) => {
        if (!password) reject(new Error("MissingPasswordError"));

        bcrypt.hash(password, 10, (err, hash) => {
            if (err) reject(err);
            this.password = hash;
            resolve(this);
        });
    });

    if (!cb) return promise;
    promise.then((result) => cb(null, result)).catch((err) => cb(err));
};

module.exports = mongoose.model("Driver", DriverSchema);
