const { DriverController } = require("../controllers/index");
const Authorization = require("../../polices/index");
const Upload = require('../../services/FileUploadService');
const express = require("express");
const router = express.Router();
/*
DRIVER ONBOARDING API'S
*/
router.post("/register",Upload.driver.single('image'), DriverController.register);
router.post("/login", DriverController.login);
router.post("/verifyPhoneOtp", Authorization.isDriverAuth, DriverController.verifyPhoneOtp);
router.post("/logout", Authorization.isDriverAuth, DriverController.logout);
router.post("/getProfile", Authorization.isDriverAuth, DriverController.getProfile);
router.post("/verifyOtp", Authorization.isDriverAuth, DriverController.verifyOtp);
router.post("/updateProfile", Authorization.isDriverAuth,Upload.driver.single('image'), DriverController.updateProfile);
router.post('/changePassword', Authorization.isDriverAuth, DriverController.changePassword);
router.post("/forgotPassword", DriverController.forgotPassword);
router.post("/forgotChangePassword", DriverController.forgotChangePassword);
router.post("/reSendOtp", Authorization.isDriverAuth, DriverController.reSendOtp);
router.post("/sendOtp", Authorization.isDriverAuth, DriverController.sendOtp);
router.post("/addVehicleDetails", Authorization.isDriverAuth, DriverController.addVehicleDetails);
router.post("/addDriverDocument",Upload.driver.single('image'), Authorization.isDriverAuth, DriverController.addDriverDocument);
module.exports = router;