const joi = require("joi");
const universalFunction = require("../../lib/universal-function");
const { constant } = require("../../constant");

const validateRegister = async (req) => {
  let schema = joi.object().keys({
      firstName: joi.string().regex(/^[a-zA-Z ]+$/),
      lastName: joi.string().regex(/^[a-zA-Z0-9_.]+$/),
      email: joi.string().email().required(),
      phoneNo: joi.string().regex(/^[0-9]{5,}$/),
      countryCode: joi.string().regex(/^[0-9+]{1,}$/),
      password: joi.string().required(),
      confirmPassword: joi.string().required(),
      country: joi.string(),
      state: joi.string(),
      city: joi.string(),
      image: joi.string().optional()
  })
  return await universalFunction.validateSchema(req.body, schema);
};
const validateLogin = async (req) => {
  let schema = joi.object().keys({
    email: joi.string().email().optional(),
    countryCode:joi.string().optional(),
    phoneNo: joi.string().regex(/^[0-9]{5,}$/),
    password: joi.string().required(),
    deviceToken: joi.string().optional(),
  });
  return await universalFunction.validateSchema(req.body, schema);
};
const validateUpdateProfile = async (req) => {
  let schema = joi.object().keys({
    firstNAme: joi.string().regex(/^[a-zA-Z ]+$/).optional(),
    lastName: joi.string().regex(/^[a-zA-Z0-9_.]+$/).optional(),
    email: joi.string().email().optional(),
    phoneNo: joi.string().regex(/^[0-9]{5,}$/).optional(),
    countryCode: joi.string().regex(/^[0-9+]{1,}$/).optional(),
    password: joi.string().required().optional(),
    country: joi.string().optional(),
    state: joi.string().optional(),
    city: joi.string().optional(),
    image: joi.string().optional()
  })
  return await universalFunction.validateSchema(req.body, schema);
};
const validateChangePassword = async (req) => {
  let schema = joi.object().keys({
    oldPassword: joi.string().required(),
    newPassword: joi.string().required(),
    confirmPassword: joi.ref("newPassword"),
  });
  return await universalFunction.validateSchema(req.body, schema);
};
const validateResetPassword = async (req) => {
  let schema = joi.object().keys({
    passwordResetToken: joi.string().required(),
    newPassword: joi.string().required(),
  });
  return await universalFunction.validateSchema(req.body, schema);
};
const validateSendOtp = async (req) => {
  let schema = joi.object().keys({
    phoneNo: joi
      .string()
      .regex(/^[0-9]{5,}$/)
      .required(),
    countryCode: joi
      .string()
      .regex(/^[0-9+]{1,}$/)
      .required(),
  });
  return await universalFunction.validateSchema(req.body, schema);
};
const validateVerifyOtp = async (req) => {
  let schema = joi.object().keys({
    otpCode: joi.string().required(),
    phoneNo: joi
      .string()
      .regex(/^[0-9]{5,}$/)
      .required(),
    countryCode: joi
      .string()
      .regex(/^[0-9+]{1,}$/)
      .required(),
  });
  return await universalFunction.validateSchema(req.body, schema);
};
const validateActiveStatus = async (req) => {
  const schema = joi.object().keys({
    checked: joi.boolean().required(),
  });
  return await universalFunction.validateSchema(req.body, schema);
};
const validateForgotPassword=async (req)=> {
  let schema = joi.object().keys({
      phoneNo:joi.string().regex(/^[0-9]+$/).min(5).required().error(() => {
          return {
            message: messages.PHONE_NUMBER_VALIDATION_ERROR,
          };
        }),
      countryCode:joi.string().regex(/^[0-9,+]+$/).trim().min(2).required().error(() => {
          return {
            message: messages.COUNTRY_CODE_VALIDATION_ERROR,
          };
        }),
  });
  return await universalFunction.validateSchema(req.body,schema);
};
const validateForgotChangePassword=async (req)=> {
  let schema = joi.object().keys({
      resetToken: joi.string().required(),
      password: joi.string().required()
  });
  return await universalFunction.validateSchema(req.body,schema);
};
const validateSendOtpCode=async (req)=> {
  let schema = joi.object().keys({
        phoneNo:joi.string().regex(/^[0-9]+$/).min(5).required().error(() => {
            return {
              message: messages.PHONE_NUMBER_VALIDATION_ERROR,
            };
          }),
        countryCode:joi.string().regex(/^[0-9,+]+$/).trim().min(2).required().error(() => {
            return {
              message: messages.COUNTRY_CODE_VALIDATION_ERROR,
            };
          }),
      });
  return await universalFunction.validateSchema(req.body,schema);
};
const validateVerifyOtpCode=async (req)=> {
  let schema = joi.object().keys({
      otpCode: joi.string().required(),
      phoneNo: joi.string().regex(/^[0-9]{5,}$/),
      countryCode:joi.string().required()
  });
  return await universalFunction.validateSchema(req.body,schema);
};
const validateVerifyPhoneOtp=async (req)=> {
  let schema = joi.object().keys({
      otpCode: joi.string().required()
  });
  return await universalFunction.validateSchema(req.body,schema);
};
module.exports = {
  validateRegister,
  validateLogin,
  validateUpdateProfile,
  validateChangePassword,
  validateResetPassword,
  validateSendOtp,
  validateVerifyOtp,
  validateVerifyPhoneOtp,
  validateActiveStatus,
  validateForgotPassword,
  validateForgotChangePassword,
  validateSendOtpCode,
  validateVerifyOtpCode
};
