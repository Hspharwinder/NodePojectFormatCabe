const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        firstName: { type: String, default: "" },
        lastName: { type: String, default: "" },
        email: { type: String, index: true, default: "" },
        phoneNo: { type: String, index: true, default: "" },
        countryCode: { type: String, index: true, default: "" },
        password: { type: String, index: true, default: "" },
        country: { type: String, default: "" },
        state: { type: String, default: "" },
        city: { type: String, default: "" },
        image: { type: String, default: "" },
        freeLancingDriver: { type: Boolean, default: false},
        businessOwner: {type: Boolean, default: false},    
        accessToken: { type: String, index: true, default: "" },
        deviceId: { type: String, default: "" },
        deviceType: { type: String, enum: ["ANDROID", "IOS", "WEB"] },
        deviceToken: { type: String, default: "" },
        resetToken: { type: String, default: "" },
        resetTokenDate: { type: Date, default: "" },
        isPhoneVerified:{ type: Boolean, default: true },
        isActive: { type: Boolean, default: true },
        isBlocked: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false }
    },
    { timestamps: true }
);
UserSchema.set("toJSON", {
    transform: function (doc, ret, option) {
        delete ret.password;
        delete ret.__v;
    },
});

UserSchema.methods.authenticate = function (password, cb) {
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

UserSchema.methods.setPassword = function (password, cb) {
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

module.exports = mongoose.model("Customer", UserSchema);
