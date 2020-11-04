const Model = require("../../models/index");
const Service = require("../../services/index");
const Validation = require("../Validations/index");
const universalFunction = require("../../lib/universal-function");
const appConstant = require("../../constant");
const statusCodeList = require("../../statusCodes");
const messageList = require("../../messages");
const userController = require("./userController");


const constant = appConstant.constant;
const statusCode = statusCodeList.statusCodes.STATUS_CODE;
const messages = messageList.messages.MESSAGES;
const _ = require("lodash");
const mongoose = require("mongoose");
const moment = require("moment");
const request = require("request");
const bluebird = require("bluebird");
/*
Customer ONBOARDING API'S
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
/*
Customer ONBOARDING API'S
*/
async function register(req, res, next) {
  try {
    await Validation.isUserValidate.validateRegister(req);
    let setObj = {};
    if (req.body.email) {
      const emailUser = await Model.User.findOne({
        email: req.body.email,
        isDeleted: false,
      });
      if (emailUser) {
        throw messages.EMAIL_ALREDAY_EXIT;
      }
    }
    if (req.body.password === req.body.confirmPassword) {
      setObj.password = await universalFunction.hashPasswordUsingBcrypt(req.body.password);
    }else{
      throw messages.CONFIRM_PASSWORD_NOT_MATCHED_WITH_PASSWORD;
    }
    if (req.body.phoneNo) {
      const userData = await Model.User.findOne({
        phoneNo: req.body.phoneNo,
        isDeleted: false,
      });
      if (userData) {
        throw messages.PHONE_NUMBER_ALREADY_EXISTS;
      }
    }
    req.body.image = "";
    if (req.file && req.file.filename) {
      req.body.image = `${constant.FILE_PATH.USER}/${req.file.filename}`;
    }
    let customer = await new Model.User(req.body).save();
    let accessToken = await universalFunction.jwtSign(customer);
    setObj.accessToken = accessToken;
    const otpCode = await Service.OtpService.issue();
    const veificationToken = await universalFunction.generateRandomString(20);
    const payloadData = {
      otpCode: otpCode,
      message: `Your otp code is ${otpCode}`,
      countryCode: customer.countryCode,
      phoneNo: customer.phoneNo,
      customerId: customer._id,
      email: customer.email,
      veificationToken: veificationToken,
    };
    setObj.resetTokenDate = new Date();
    setObj.resetToken = veificationToken;

    console.log(payloadData)
    setObj.resetToken = otpCode;
    Service.EmailService.sendDriverVerifyMail(payloadData);
    customer = await Model.User.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(payloadData.customerId),
      },
      {
        $set: setObj,
      }
    );
    customer.resetToken = otpCode;
    customer.accessToken = accessToken;
    return universalFunction.sendResponse(
      req,
      res,
      statusCode.SUCCESS,
      messages.USER_REGISTER_SUCCESSFULLY,
      customer
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
}
async function login(req, res, next) {
  try {
    await Validation.isUserValidate.validateLogin(req);
    let setObj = {};
    let customer = await Model.User.findOne({
      $or: [
        {
          phoneNo: req.body.phoneNo
        }
      ],
      isDeleted: false,
    });
    if (!customer) throw messages.CUSTOMER_NOT_FOUND;
    if (customer && customer.isBlocked) throw messages.USER_BLOCKED;
    let password = await universalFunction.comparePasswordUsingBcrypt(
      req.body.password,
      customer.password
    );
    if (!password) {
      throw messages.INVALID_PASSWORD;
    }
    let accessToken = await universalFunction.jwtSign(customer);
    customer.accessToken = accessToken;
    setObj.accessToken = accessToken;
    await Model.User.findOneAndUpdate(
      {
        _id: customer._id,
      },
      {
        $set: setObj,
      }
    );
    return universalFunction.sendResponse(
      req,
      res,
      statusCode.SUCCESS,
      messages.USER_LOGIN_SUCCESSFULLY,
      customer
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
}
async function verifyPhoneOtp(req, res, next) {
  try {
    await Validation.isUserValidate.validateVerifyPhoneOtp(req);
    const otpCode = await universalFunction.generateRandomString(20);

    const otpData = await Model.User.findOne({
      _id: req.customer._id,
      resetToken: req.body.otpCode,
    });
    if (!otpData) {
      throw messages.INVALID_OTP;
    } else {
      await Model.User.findOneAndUpdate(
        {
          _id: req.customer._id,
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
    let accessToken = await universalFunction.jwtSign(req.customer);
    await Model.User.findOneAndUpdate(
      {
        _id: req.customer._id,
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
      messages.USER_LOGOUT_SUCCESSFULLY,
      {}
    );
  } catch (error) {
    next(error);
  }
}
async function getProfile(req, res, next) {
  try {
    let dataToSend = {};
    dataToSend.customerData = await Model.User.findOne({
      _id: req.customer._id,
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
    let message = messages.CUSTOMER_PROFILE_UPDATED_SUCCESSFULLY;
    await Validation.isUserValidate.validateUpdateProfile(req);

    let setObj = req.body;
    let customer = await Model.User.findOne({
      _id: req.customer._id,
    });
    if (setObj.password) {
      const customerData = await Model.User.findOne({
        _id: req.customer._id,
      });
      let passwordValid = await universalFunction.comparePasswordUsingBcrypt(
        req.body.password,
        customerData.password
      );
      if (passwordValid) {
        throw messages.SAME_PASSWORD_NOT_ALLOWED;
      }
    }
    if (setObj.email) {
      const customerData = await Model.User.findOne({
        _id: {
          $nin: [req.customer._id],
        },
        email: req.body.email,
        isDeleted: false,
      });
      if (customerData) throw messages.EMAIL_ALREDAY_EXIT;
    }
    if (setObj.firstName) {
      const customerData = await Model.User.findOne({
        _id: {
          $nin: [req.customer._id],
        },
        firstName: req.body.firstName,
        isDeleted: false,
      });
      if (customerData) {
        throw messages.USER_FIRST_NAME_ALREADY_EXISTS;
      }
    }
    if (setObj.lastName) {
      const customerData = await Model.User.findOne({
        _id: {
          $nin: [req.customer._id],
        },
        lastName: req.body.lastName,
        isDeleted: false,
      });
      if (customerData) {
        throw messages.USER_LAST_NAME_ALREADY_EXISTS;
      }
    }

    if (setObj.phoneNo && !setObj.countryCode) {
      setObj.countryCode = req.Customer.countryCode;
    }
    if (!setObj.phoneNo && setObj.countryCode) {
      setObj.phoneNo = req.Customer.phoneNo;
    }
    if (setObj.phoneNo && setObj.countryCode) {
      const customerData = await Model.User.findOne({
        _id: {
          $nin: [req.customer._id],
        },
        phoneNo: req.body.phoneNo,
        isDeleted: false,
      });
      if (customerData) {
        throw messages.PHONE_NUMBER_ALREADY_EXISTS;
      }
      setObj.isPhoneVerified = false;
    }
    if (req.file && req.file.filename) {
      setObj.image = `${constant.FILE_PATH.USER}/${req.file.filename}`;
    }
    await Model.User.findOneAndUpdate(
      {
        _id: req.customer._id,
      },
      {
        $set: setObj,
      }
    );
    customer = await Model.User.findOne({ _id: req.customer._id });
    return universalFunction.sendResponse(
      req,
      res,
      statusCode.SUCCESS,
      message,
      customer
    );
  } catch (error) {
    console.log(error)
    next(error);
  }
}
async function forgotPassword(req, res, next) {
  try {
    await Validation.isUserValidate.validateForgotPassword(req);
    let setObj = {
      resetTokenDate: new Date(),
    };
    const customer = await Model.User.findOne(
      {
        phoneNo: req.body.phoneNo,
        countryCode: req.body.countryCode,
        isDeleted: false,
        isBlocked: false,
      },
      { phoneNo: 1, _id: 1, countryCode: 1, email: 1 }
    );
    if (!customer) throw messages.PHONE_NUMBER_NOT_EXISTS;

    const otpCode = await Service.OtpService.issue();
    let payloadData = {
      customerId: customer._id,
      otpCode: otpCode,
      message: "Your otp code is {{otpCode}}",
      countryCode: customer.countryCode,
      phoneNo: customer.phoneNo,
    };
    setObj.resetToken = otpCode;
    Service.OtpService.sendOtp(payloadData);
    await Model.User.findOneAndUpdate(
      {
        _id: customer._id,
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
    await Validation.isUserValidate.validateForgotChangePassword(req);
    const customer = await Model.User.findOne({
      resetToken: req.body.resetToken,
    });
    if (!customer) throw messages.INVALID_TOKEN;
    const otpCode = await universalFunction.generateRandomString(20);
    const password = await universalFunction.hashPasswordUsingBcrypt(
      req.body.password
    );
    await Model.User.updateOne(
      {
        _id: customer._id,
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
      messages.USER_CHANGED_PASSWORD_SUCCESSFULLY,
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
    const customerData = await Model.User.findOne(
      {
        _id: req.customer._id,
        isDeleted: false,
      },
      { _id: 1, phoneNo: 1, countryCode: 1 }
    );

    const payloadData = {
      otpCode: otpCode,
      message: `Your otp code is ${otpCode}`,
      countryCode: customerData.countryCode,
      phoneNo: customerData.phoneNo,
      customerId: customerData._id,
      veificationToken: veificationToken,
    };
    console.log(payloadData)
    setObj.resetToken = otpCode;
    Service.OtpService.sendOtp(payloadData);
    await Model.User.findOneAndUpdate(
      {
        _id: customerData._id,
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
    await Validation.isUserValidate.validateSendOtpCode(req);
    let setObj = {
      resetTokenDate: new Date(),
    };
    let customerData = await Model.User.findOne(
      {
        phoneNo: req.body.phoneNo,
        isDeleted: false,
      },
      { _id: 1, phoneNo: 1, countryCode: 1, email: 1 }
    );
    if (customerData) {
      throw messages.PHONE_NUMBER_ALREADY_EXISTS;
    }
    const otpCode = await Service.OtpService.issue();
    const veificationToken = await universalFunction.generateRandomString(20);

    const payloadData = {
      otpCode: otpCode,
      message: `Your otp code is ${otpCode}`,
      countryCode: req.body.countryCode,
      phoneNo: req.body.phoneNo,
      customerId: req.customer._id,
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
    await Validation.isUserValidate.validateVerifyOtpCode(req);
    console.log(req.body)
    const otpData = await Service.OtpService.verify(req.body);
    if (!otpData) {
      throw messages.INVALID_OTP;
    }
    if(otpData && otpData.customerId){
      await Model.Driver.findOneAndUpdate(
        {
          _id: mongoose.Types.ObjectId(otpData.customerId),
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
async function changePassword(req, res, next) {
  try {
    await Validation.isUserValidate.validateChangePassword(req);
    let setObj = req.body;
    const customerData = await Model.User.findOne({
      _id: req.customer._id,
    });
    let passwordValid = await universalFunction.comparePasswordUsingBcrypt(
      setObj.oldPassword,
      customerData.password
    );
    if (!passwordValid) {
      throw messages.OLD_PASSWORD_NOT_MATCH;
    }
    const password = await universalFunction.hashPasswordUsingBcrypt(
      setObj.newPassword
    );
    setObj.password = password;
    await Model.User.findOneAndUpdate(
      {
        _id: req.customer._id,
      },
      {
        $set: setObj,
      }
    );
    return universalFunction.sendResponse(
      req,
      res,
      statusCode.SUCCESS,
      messages.USER_CHANGED_PASSWORD_SUCCESSFULLY,
      {}
    );
  } catch (error) {
    next(error);
  }
}