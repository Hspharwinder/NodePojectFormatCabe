const Model = require("../../models/index");
const Service = require("../../services/index");
const Validation = require("../Validations/index");
const universalFunction = require("../../lib/universal-function");
const appConstant = require("../../constant");
const statusCodeList = require("../../statusCodes");
const messageList = require("../../messages");
const DriverController = require("./DriverController");


const constant = appConstant.constant;
const statusCode = statusCodeList.statusCodes.STATUS_CODE;
const messages = messageList.messages.MESSAGES;
const _ = require("lodash");
const mongoose = require("mongoose");
const moment = require("moment");
const request = require("request");
const bluebird = require("bluebird");
/*
DRIVER ONBOARDING API'S
*/
exports.register = register
exports.login = login
exports.verifyPhoneOtp = verifyPhoneOtp
exports.logout = logout
exports.getProfile = getProfile
exports.updateProfile = updateProfile
exports.changePassword = changePassword
exports.forgotPassword = forgotPassword
exports.forgotChangePassword = forgotChangePassword
exports.reSendOtp = reSendOtp
exports.sendOtp = sendOtp
exports.verifyOtp = verifyOtp
exports.addVehicleDetails = addVehicleDetails
exports.addDriverDocument = addDriverDocument
// exports.deleteDriverDocument = deleteDriverDocument
// exports.getDriverDocument =getDriverDocument
// exports.getDefaultDriverDocument = getDefaultDriverDocument
/*
DRIVER ONBOARDING API'S
*/
async function register(req, res, next) {
  try {
    await Validation.isDriverValidate.validateRegister(req);
    let setObj = {
      isPhoneVerified: true,
    };
    if (req.body.email) {
      const emailUser = await Model.Driver.findOne({
        email: req.body.email,
        isDeleted: false,
      });
      if (emailUser) {
        throw messages.EMAIL_ALREDAY_EXIT;
      }
    }
    if (req.body.firstName) {
      const firstNameCheck = await Model.Driver.findOne({
        firstName: req.body.firstName,
        isDeleted: false,
      });
      if (firstNameCheck) {
        throw messages.USER_FIRST_NAME_ALREADY_EXISTS;
      }
    }
    if (req.body.phoneNo) {
      const driverData = await Model.Driver.findOne({
        phoneNo: req.body.phoneNo,
        isDeleted: false,
      });
      if (driverData) {
        throw messages.PHONE_NUMBER_ALREADY_EXISTS;
      }
    }
    if (req.body.password) {
      setObj.password = await universalFunction.hashPasswordUsingBcrypt(req.body.password)
    }
    req.body.image = "";
    if (req.file && req.file.filename) {
      req.body.image = `${constant.FILE_PATH.USER}/${req.file.filename}`;
    }

    let driver = await new Model.Driver(req.body).save();
    let accessToken = await universalFunction.jwtSign(driver);
    setObj.accessToken = accessToken;
    const otpCode = await Service.OtpService.issue();
    const veificationToken = await universalFunction.generateRandomString(20);
    const payloadData = {
      otpCode: otpCode,
      message: `Your otp code is ${otpCode}`,
      countryCode: driver.countryCode,
      phoneNo: driver.phoneNo,
      driverId: driver._id,
      email: driver.email,
      veificationToken: veificationToken,
    };
    setObj.resetTokenDate = new Date();
    setObj.resetToken = otpCode;
    if (req.body.verficationService == constant.VERIFICATION_SERVICE.EMAIL) {
      setObj.resetToken = veificationToken;
      Service.EmailService.sendDriverVerifyMail(payloadData);
    } 
    else if (req.body.verficationService == constant.VERIFICATION_SERVICE.SMS) {
      setObj.resetToken = otpCode;
      Service.OtpService.sendOtp(payloadData);
    }
    driver = await Model.Driver.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(driver._id),
      },
      {
        $set: setObj,
      }
    );
    driver.resetToken = otpCode;
    driver.accessToken = accessToken;
    return universalFunction.sendResponse(
      req,
      res,
      statusCode.SUCCESS,
      messages.DRIVER_REGISTER_SUCCESSFULLY,
      driver
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
}
async function login(req, res, next) {
  try {
    await Validation.isDriverValidate.validateLogin(req);
    let setObj = {};
    let driver = await Model.Driver.findOne({
      $or: [
        {
          phoneNo: req.body.phoneNo
        }
      ],
      isDeleted: false,
    });
    if (!driver) throw messages.DRIVER_NOT_FOUND;
    if (driver && driver.isBlocked) throw messages.DRIVER_BLOCKED;
    let password = await universalFunction.comparePasswordUsingBcrypt(
      req.body.password,
      driver.password
    );
    if (!password) {
      throw messages.INVALID_PASSWORD;
    }
    let accessToken = await universalFunction.jwtSign(driver);
    driver.accessToken = accessToken;
    setObj.accessToken = accessToken;
    await Model.Driver.findOneAndUpdate(
      {
        _id: driver._id,
      },
      {
        $set: setObj,
      }
    );
    return universalFunction.sendResponse(
      req,
      res,
      statusCode.SUCCESS,
      messages.DRIVER_LOGIN_SUCCESSFULLY,
      driver
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
}
async function verifyPhoneOtp(req, res, next) {
  try {
    await Validation.isDriverValidate.validateVerifyPhoneOtp(req);
    const otpCode = await universalFunction.generateRandomString(20);

    const otpData = await Model.Driver.findOne({
      _id: req.driver._id,
      resetToken: req.body.otpCode,
    });
    if (!otpData) {
      throw messages.INVALID_OTP;
    } else {
      await Model.Driver.findOneAndUpdate(
        {
          _id: req.driver._id,
        },
        {
          $set: {
            isPhoneVerified: true,
            isApproved: true,
            resetToken: otpCode,
          },
        }
      );
    }
    return universalFunction.sendResponse(
      req,
      res,
      statusCode.SUCCESS,
      messages.OTP_VERIFIED,
      otpData
    );
  } catch (error) {
    next(error);
  }
}
async function logout(req, res, next) {
  try {
    let accessToken = await universalFunction.jwtSign(req.driver);
    await Model.Driver.findOneAndUpdate(
      {
        _id: req.driver._id,
      },
      {
        accessToken: accessToken,
      },
      {}
    );
    return universalFunction.sendResponse(
      req,
      res,
      statusCode.SUCCESS,
      messages.DRIVER_LOGOUT_SUCCESSFULLY,
      {}
    );
  } catch (error) {
    next(error);
  }
}
async function getProfile(req, res, next) {
  try {
    let dataToSend = {};
    dataToSend.driverData = await Model.Driver.findOne({
      _id: req.driver._id,
    });
    return universalFunction.sendResponse(
      req,
      res,
      statusCode.SUCCESS,
      messages.SUCCESS,
      dataToSend
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
}
async function updateProfile(req, res, next) {
  try {
    let message = messages.DRIVER_PROFILE_UPDATED_SUCCESSFULLY;
    await Validation.isDriverValidate.validateUpdateProfile(req);

    let setObj = req.body;
    let driver = await Model.Driver.findOne({
      _id: req.driver._id,
    });
    if (setObj.password) {
      const driverData = await Model.Driver.findOne({
        _id: req.driver._id,
      });
      let passwordValid = await universalFunction.comparePasswordUsingBcrypt(
        req.body.password,
        driverData.password
      );
      if (passwordValid) {
        throw messages.SAME_PASSWORD_NOT_ALLOWED;
      }
    }
    if (setObj.email) {
      const driverData = await Model.Driver.findOne({
        _id: {
          $nin: [req.driver._id],
        },
        email: req.body.email,
        isDeleted: false,
      });
      if (driverData) throw messages.EMAIL_ALREDAY_EXIT;
    }
    if (setObj.firstName) {
      const driverData = await Model.Driver.findOne({
        _id: {
          $nin: [req.driver._id],
        },
        firstName: req.body.firstName,
        isDeleted: false,
      });
      if (driverData) {
        throw messages.USER_FIRST_NAME_ALREADY_EXISTS;
      }
    }

    if (setObj.phoneNo && !setObj.countryCode) {
      setObj.countryCode = req.driver.countryCode;
    }
    if (!setObj.phoneNo && setObj.countryCode) {
      setObj.phoneNo = req.driver.phoneNo;
    }
    if (setObj.phoneNo && setObj.countryCode) {
      const driverData = await Model.Driver.findOne({
        _id: {
          $nin: [req.driver._id],
        },
        phoneNo: req.body.phoneNo,
        isDeleted: false,
      });
      setObj.driverData.isPhoneVerified = false
      if (driverData) {
        throw messages.PHONE_NUMBER_ALREADY_EXISTS;
      }
      setObj.isPhoneVerified = false;
    }
    if (req.file && req.file.filename) {
      setObj.image = `${constant.FILE_PATH.DRIVER}/${req.file.filename}`;
    }
    await Model.Driver.findOneAndUpdate(
      {
        _id: req.driver._id,
      },
      {
        $set: setObj,
      }
    );
    driver = await Model.Driver.findOne({ _id: req.driver._id });

    return universalFunction.sendResponse(
      req,
      res,
      statusCode.SUCCESS,
      message,
      driver
    );
  } catch (error) {
    console.log(error)
    next(error);
  }
}
async function changePassword(req, res, next) {
  try {
    await Validation.isDriverValidate.validateChangePassword(req);

    let setObj = req.body;
    const driverData = await Model.Driver.findOne({
      _id: req.driver._id,
    });
    let passwordValid = await universalFunction.comparePasswordUsingBcrypt(
      req.body.oldPassword,
      driverData.password
    );
    if (!passwordValid) {
      throw messages.OLD_PASSWORD_NOT_MATCH;
    }
    const password = await universalFunction.hashPasswordUsingBcrypt(
      req.body.newPassword
    );
    req.body.password = password;
    await Model.Driver.findOneAndUpdate(
      {
        _id: req.driver._id,
      },
      {
        $set: setObj,
      }
    );
    return universalFunction.sendResponse(
      req,
      res,
      statusCode.SUCCESS,
      messages.DRIVER_CHANGED_PASSWORD_SUCCESSFULLY,
      {}
    );
  } catch (error) {
    next(error);
  }
}
async function forgotPassword(req, res, next) {
  try {
    await Validation.isDriverValidate.validateForgotPassword(req);
    let setObj = {
      resetTokenDate: new Date(),
    };
    const driver = await Model.Driver.findOne(
      {
        phoneNo: req.body.phoneNo,
        countryCode: req.body.countryCode,
        isDeleted: false,
        isBlocked: false,
      },
      { phoneNo: 1, _id: 1, countryCode: 1, email: 1 }
    );
    if (!driver) throw messages.PHONE_NUMBER_NOT_EXISTS;

    const otpCode = await Service.OtpService.issue();
    let payloadData = {
      driverId: driver._id,
      otpCode: otpCode,
      message: "Your otp code is {{otpCode}}",
      countryCode: driver.countryCode,
      phoneNo: driver.phoneNo,
    };
    setObj.resetToken = otpCode;
    Service.OtpService.sendOtp(payloadData);
    await Model.Driver.findOneAndUpdate(
      {
        _id: driver._id,
      },
      {
        $set: setObj,
      }
    );
    return universalFunction.sendResponse(
      req,
      res,
      statusCode.SUCCESS,
      messages.OTP_CODE_SEND_YOUR_REGISTER_PHONE_NUMBER,
      payloadData
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
}
async function forgotChangePassword(req, res, next) {
  try {
    await Validation.isDriverValidate.validateForgotChangePassword(req);
    const driver = await Model.Driver.findOne({
      resetToken: req.body.resetToken,
    });
    if (!driver) throw messages.INVALID_TOKEN;
    const otpCode = await universalFunction.generateRandomString(20);
    const password = await universalFunction.hashPasswordUsingBcrypt(
      req.body.password
    );
    await Model.Driver.updateOne(
      {
        _id: driver._id,
      },
      {
        $set: {
          password: password,
          resetToken: otpCode,
        },
      }
    );
    return universalFunction.sendResponse(
      req,
      res,
      statusCode.SUCCESS,
      messages.DRIVER_CHANGED_PASSWORD_SUCCESSFULLY,
      {}
    );
  } catch (error) {
    next(error);
  }
}
async function reSendOtp(req, res, next) {
  try {
    let setObj = {
      resetTokenDate: new Date(),
    };
    const otpCode = await Service.OtpService.issue();
    const veificationToken = await universalFunction.generateRandomString(20);

    const driverData = await Model.Driver.findOne(
      {
        _id: req.driver._id,
        isDeleted: false,
      },
      { _id: 1, phoneNo: 1, countryCode: 1 }
    );

    const payloadData = {
      otpCode: otpCode,
      message: `Your otp code is ${otpCode}`,
      countryCode: driverData.countryCode,
      phoneNo: driverData.phoneNo,
      userId: driverData._id,
      veificationToken: veificationToken,
    };
    setObj.resetToken = otpCode;
    Service.OtpService.sendOtp(payloadData);
    await Model.Driver.findOneAndUpdate(
      {
        _id: driverData._id,
      },
      {
        $set: setObj,
      }
    );
    return universalFunction.sendResponse(
      req,
      res,
      statusCode.SUCCESS,
      messages.OTP_CODE_SEND_YOUR_REGISTER_PHONE_NUMBER,
      payloadData
    );
  } catch (error) {
    next(error);
  }
}
async function sendOtp(req, res, next) {
  try {
    await Validation.isDriverValidate.validateSendOtpCode(req);
    let setObj = {
      resetTokenDate: new Date(),
    };
    let driverData = await Model.Driver.findOne(
      {
        phoneNo: req.body.phoneNo,
        isDeleted: false,
      },
      { _id: 1, phoneNo: 1, countryCode: 1, email: 1 }
    );
    if (driverData) {
      throw messages.PHONE_NUMBER_ALREADY_EXISTS;
    }
    const otpCode = await Service.OtpService.issue();
    const veificationToken = await universalFunction.generateRandomString(20);

    const payloadData = {
      otpCode: otpCode,
      message: "Your otp code is {{otpCode}}",
      countryCode: req.body.countryCode,
      phoneNo: req.body.phoneNo,
      driverId: null,
      veificationToken: veificationToken,
    };
    setObj.resetToken = otpCode;
    Service.OtpService.sendOtp(payloadData);
    return universalFunction.sendResponse(
      req,
      res,
      statusCode.SUCCESS,
      messages.OTP_CODE_SEND_YOUR_PHONE_NUMBER,
      payloadData
    );
  } catch (error) {
    next(error);
  }
}
async function verifyOtp(req, res, next) {
  try {
    await Validation.isDriverValidate.validateVerifyOtpCode(req);
    const otpData = await Service.OtpService.verify(req.body);
    if (!otpData) {
      throw messages.INVALID_OTP;
    }
    if(otpData && otpData.driverId){
      await Model.Driver.findOneAndUpdate(
        {
          _id: mongoose.Types.ObjectId(otpData.driverId),
        },
        {
          $set: {
            isPhoneVerified: true
          },
        }
      );
    }
    return universalFunction.sendResponse(
      req,
      res,
      statusCode.SUCCESS,
      messages.OTP_VERIFIED,
      otpData
    );
  } catch (error) {
    next(error);
  }
}
/*
VEHICLE DEATILS API'S
*/
async function addVehicleDetails(req, res, next) {
  try {
    await Validation.isDriverValidate.validateAddVehicleDetails(req);
    let setObj = req.body;
    let sendToData = {
      isUploadVehicleDetails:true
    }
    if (setObj.vehicleNumber) {
      const vehicleData = await Model.Vehicle.findOne({
        vehicleNumber: setObj.vehicleNumber,
        isDeleted: false,
      });
      if (vehicleData) {
        throw messages.VEHICLE_NUMBER_ALREADY_EXISTS;
      }
    }
    let vehicleDetails = await Model.Vehicle(setObj).save();
    await Model.Driver.findOneAndUpdate(
      {
       _id: mongoose.Types.ObjectId(req.driver._id),
      },
      {
        $set: sendToData,
      }
    );
    
    return universalFunction.sendResponse(
      req,
      res,
      statusCode.SUCCESS,
      messages.ADD_VEHICLE_DETAILS_SUCCESSFULLY,
      vehicleDetails
    );
  } catch (error) {
    next(error);
  }
}
/*
DRIVER DOCUMENT API'S
*/
async function addDriverDocument(req, res, next) {
  try {
    await Validation.isDriverValidate.validateAddDriverDocument(req);
    let documents = req.body.documents || [];
    let finalDocuments = [];
    await Model.DriverDocument.deleteMany({
      driverId: req.driver._id,
    });
    await Model.Driver.findOneAndUpdate(
      {
        _id: req.driver._id,
      },
      {
        $set: { isUploadDocument: true },
      }
    );
    let obj = {
      driverId: req.driver._id
    };
    if (documents && documents.length) {
      for (let i = 0; i < documents.length; i++) {
        obj.driverImage=req.body.driverImage;
        obj.documentImage=documents[i];
        finalDocuments.push(obj);
      }
    }

    await Model.DriverDocument.insertMany(finalDocuments);
    return universalFunction.sendResponse(
      req,
      res,
      statusCode.SUCCESS,
      messages.SUCCESS,
      {}
    );
  } catch (error) {
    console.log(error)
    next(error);
  }
}
// async function deleteDriverDocument(req, res, next) {
//   try {
//     await Validation.isDriverValidate.validateDeleteDriverDocument(req);

//     await Model.DriverDocument.deleteOne({
//       driverId: req.user._id,
//       driverDocumentId: req.body.driverDocumentId,
//     });
//     return universalFunction.sendResponse(
//       req,
//       res,
//       statusCode.SUCCESS,
//       messages.SUCCESS,
//       {}
//     );
//   } catch (error) {
//     next(error);
//   }
// }
// async function getDriverDocument(req, res, next) {
//   try {
//     await Validation.isDriverValidate.validateGetDriverDocument(req);
//     let dataToSend = {};
//     let skip = parseInt(req.body.pageNo - 1) || 0;
//     let limit = constant.DEFAULT_LIMIT;
//     skip = skip * limit;
//     let criteria = { isDeleted: false, driverId: req.user._id };
//     let count = await Model.DriverDocument.countDocuments(criteria);
//     let documentData = await Model.DriverDocument.find(criteria)
//       .limit(limit)
//       .skip(skip)
//       .sort({ createdAt: -1 });
//     dataToSend.documentData = documentData;
//     dataToSend.totalPages = Math.ceil(count / limit) || 0;
//     return universalFunction.sendResponse(
//       req,
//       res,
//       statusCode.SUCCESS,
//       messages.SUCCESS,
//       dataToSend
//     );
//   } catch (error) {
//     next(error);
//   }
// }
// async function getDefaultDriverDocument(req, res, next) {
//   try {
//     await Validation.isDriverValidate.validateGetDefaultDriverDocument(req);
//     let dataToSend = {};
//     let skip = parseInt(req.body.pageNo - 1) || 0;
//     let limit = constant.DEFAULT_LIMIT;
//     skip = skip * limit;
//     let pipeline = [
//       {
//         $match: {
//           isDeleted: false,
//           zoneId: mongoose.Types.ObjectId(req.body.zoneId),
//           geofenceId: mongoose.Types.ObjectId(req.body.geofenceId),
//         },
//       },
//       {
//         $lookup: {
//           from: "driverdocuments",
//           localField: "_id",
//           foreignField: "documentId",
//           as: "driverDocument",
//         },
//       },
//       {
//         $project: {
//           _id: 1,
//           zoneId: 1,
//           geofenceId: 1,
//           documentName: 1,
//           isExpirydate: 1,
//           isFrontSideImage: 1,
//           isBackSideImage: 1,
//           isMandate: 1,
//           driverDocument: {
//             $filter: {
//               input: "$driverDocument",
//               as: "uf",
//               cond: {
//                 $eq: ["$$uf.driverId", mongoose.Types.ObjectId(req.user._id)],
//               },
//             },
//           },
//         },
//       },
//     ];
//     let documentData = await Model.Document.aggregate(pipeline);
//     dataToSend.documentData = documentData;
//     return universalFunction.sendResponse(
//       req,
//       res,
//       statusCode.SUCCESS,
//       messages.SUCCESS,
//       dataToSend
//     );
//   } catch (error) {
//     next(error);
//   }
// }