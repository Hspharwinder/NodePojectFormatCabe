const { userController } = require("../controllers/index");
const Authorization = require("../../polices/index");
const Upload = require('../../services/FileUploadService');
const express = require("express");
const router = express.Router();
/*
CUSTOMER ONBOARDING API'S
*/
router.post("/register",Upload.user.single('image'), userController.register);
router.post("/login", userController.login);
router.post("/verifyPhoneOtp", Authorization.isUserAuth, userController.verifyPhoneOtp);
router.post("/logout", Authorization.isUserAuth, userController.logout);
router.post("/getProfile", Authorization.isUserAuth, userController.getProfile);
router.post("/updateProfile", Authorization.isUserAuth,Upload.user.single('image'), userController.updateProfile);
router.post('/changePassword', Authorization.isUserAuth, userController.changePassword);
router.post("/forgotPassword", userController.forgotPassword);
router.post("/forgotChangePassword", userController.forgotChangePassword);
router.post("/reSendOtp",Authorization.isUserAuth, userController.reSendOtp);
router.post("/sendOtp", Authorization.isUserAuth, userController.sendOtp);
router.post("/verifyOtp", Authorization.isUserAuth, userController.verifyOtp);
module.exports = router;