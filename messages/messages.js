"use strict";
const MESSAGES = {
	SUCCESS: "SUCCESS",
	RUNDOWN_ERROR: "RUNDOWN_ERROR",
	UNAUTHORIZED: "UNAUTHORIZED",
	FORBIDDEN: "FORBIDDEN",
	ADMIN_BLOCKED: "ADMIN_BLOCKED",
	ADMIN_NOT_FOUND: "ADMIN_NOT_FOUND",
	SUCCESSFULLY_REGISTERD: "SUCCESSFULLY_REGISTERD",
	SUCCESSFULLY_SEND_RESET_LINK: "SUCCESSFULLY_SEND_RESET_LINK",
	SUCCESSFULLY_UPDATED_PASSWORD: "SUCCESSFULLY_UPDATED_PASSWORD",
	PROFILE_SUCCESSFULLY_UPDATED: "PROFILE_SUCCESSFULLY_UPDATED",
	DATABASE_ERROR: "DATABASE_ERROR",
	EMAIL_ALREDAY_VERIFIED: "EMAIL_ALREDAY_VERIFIED",
	PLEASE_TRY_AGAIN: "PLEASE_TRY_AGAIN",
	EMAIL_ALREDAY_EXIT: "EMAIL_ALREDAY_EXIT",
	USER_FIRST_NAME_ALREADY_EXISTS: "USER_FIRST_NAME_ALREADY_EXISTS",
	USER_LAST_NAME_ALREADY_EXISTS:"USER_LAST_NAME_ALREADY_EXISTS",
	SECRET_KEY_ALREDAY_EXIT: "SECRET_KEY_ALREDAY_EXIT",
	INVALID_CONTENT_LANGUAGE: "INVALID_CONTENT_LANGUAGE",
	IMPLEMENTATION_ERROR: "IMPLEMENTATION_ERROR",
	DUPLICATE_IS_NOT_ALLOWED: "DUPLICATE_IS_NOT_ALLOWED",
	INVALID_OBJECT_ID_FROMATE: "INVALID_OBJECT_ID_FROMATE",
	INVALID_IMAGE_FORMAT: "INVALID_IMAGE_FORMAT",
	INVALID_EMAIL_PASSWORD: "INVALID_EMAIL_PASSWORD",
	INVALID_PASSWORD: "INVALID_PASSWORD",
	EMAIL_OR_USERNAME_REQUIRED: "EMAIL_OR_USERNAME_REQUIRED",
	RESET_LINK_EXPIRED: "RESET_LINK_EXPIRED",
	RESET_TOKEN_EXPIRED: "RESET_TOKEN_EXPIRED",
	INVALID_EMAIL_ID: "INVALID_EMAIL_ID",
	EMAIL_ID_DOES_NOT_EXISTS: "EMAIL_ID_DOES_NOT_EXISTS",
	INVALID_USERNAME_PASSWORD: "INVALID_USERNAME_PASSWORD",
	INVALID_USERNAME: "INVALID_USERNAME",
	INVALID_ADMIN_ID: "INVALID_ADMIN_ID",
	INVALID_INPUT_PARAMETER: "INVALID_INPUT_PARAMETER",
	INVALID_TOKEN: "INVALID_TOKEN",
	IMP_ERROR: "IMP_ERROR",
	TOKEN_ALREADY_EXPIRED: "TOKEN_ALREADY_EXPIRED",
	TOKEN_NOT_GENRATED_CORRECTLY: "TOKEN_NOT_GENRATED_CORRECTLY",
	SAME_PASSWORD_NOT_ALLOWED: "SAME_PASSWORD_NOT_ALLOWED",
	OLD_PASSWORD_NOT_MATCH: "OLD_PASSWORD_NOT_MATCH",
	PASSWORD_RESET_LINK_SEND_YOUR_EMAIL: "PASSWORD_RESET_LINK_SEND_YOUR_EMAIL",
	INVALID_PASSWORD_RESET_TOKEN: "INVALID_PASSWORD_RESET_TOKEN",
	PASSWORD_CHANGED_SUCCESSFULLY: "PASSWORD_CHANGED_SUCCESSFULLY",
	INVALID_OTP: 'INVALID_OTP',
	OTP_CODE_SEND_YOUR_REGISTER_PHONE_NUMBER: "OTP_CODE_SEND_YOUR_REGISTER_PHONE_NUMBER",
	PHONE_NUMBER_ALREADY_EXISTS: "PHONE_NUMBER_ALREADY_EXISTS",
	LATEST_VERSION_LESS_THEN_CRITICAL_VERSION: "LATEST_VERSION_LESS_THEN_CRITICAL_VERSION",
	USER_NAME_ALREADY_EXISTS: "USER_NAME_ALREADY_EXISTS",
	INVALID_USERNAME_EMAIL: "INVALID_USERNAME_EMAIL",
	USER_NOT_FOUND: "USER_NOT_FOUND",
	USER_BLOCKED: "USER_BLOCKED",
	USER_UN_BLOCKED: "USER_UN_BLOCKED",
	USER_ACTIVE: "USER_ACTIVE",
	USER_UN_ACTIVE: "USER_UN_ACTIVE",
	USER_DELETED: "USER_DELETED",
	ALGORITHEM_NAME_ALREADY_EXISTS: "ALGORITHEM_NAME_ALREADY_EXISTS",
	USER_REGISTER_SUCCESSFULLY: "USER_REGISTER_SUCCESSFULLY",
	USER_LOGIN_SUCCESSFULLY: "USER_LOGIN_SUCCESSFULLY",
	USER_LOGOUT_SUCCESSFULLY: "USER_LOGOUT_SUCCESSFULLY",
	USER_PROFILE_UPDATED_SUCCESSFULLY: "USER_PROFILE_UPDATED_SUCCESSFULLY",
	USER_BANCKROLL_UPDATED_SUCCESSFULLY: "USER_BANCKROLL_UPDATED_SUCCESSFULLY",
	USER_CHANGED_PASSWORD_SUCCESSFULLY: "USER_CHANGED_PASSWORD_SUCCESSFULLY",
	USER_DELETED_ACCOUNT_SUCCESSFULLY: "USER_DELETED_ACCOUNT_SUCCESSFULLY",
	FILE_UPLOADED_SUCCESSFULLY: "FILE_UPLOADED_SUCCESSFULLY",
	OTP_VERIFIED: "OTP_VERIFIED",
	USER_CLEAR_NOTIFICATION: "USER_CLEAR_NOTIFICATION",
	USER_CLEAR_ALL_NOTIFICATION: "USER_CLEAR_ALL_NOTIFICATION",
	USER_ADD_ALGORITHEM_SUCCESSFULLY: "USER_ADD_ALGORITHEM_SUCCESSFULLY",
	USER_UPDATE_ALGORITHEM_SUCCESSFULLY: "USER_UPDATE_ALGORITHEM_SUCCESSFULLY",
	USER_DELETED_ALGORITHEM_SUCCESSFULLY: "USER_DELETED_ALGORITHEM_SUCCESSFULLY",
	USER_ADD_SUCCESSFULLY: "USER_ADD_SUCCESSFULLY",
	USER_PROFILE_UPDATED_SUCCESSFULLY: "USER_PROFILE_UPDATED_SUCCESSFULLY",
	USER_DELETED_ACCOUNT_SUCCESSFULLY: "USER_DELETED_ACCOUNT_SUCCESSFULLY",
	ADMIN_REGISTER_SUCCESSFULLY: "SUPER ADMIN_REGISTER_SUCCESSFULLY",
	ADMIN_LOGIN_SUCCESSFULLY: "ADMIN_LOGIN_SUCCESSFULLY",
	ADMIN_LOGOUT_SUCCESSFULLY: "ADMIN_LOGOUT_SUCCESSFULLY",
	ADMIN_PROFILE_UPDATED_SUCCESSFULLY: "ADMIN_PROFILE_UPDATED_SUCCESSFULLY",
	ADMIN_CHANGED_PASSWORD_SUCCESSFULLY: "ADMIN_CHANGED_PASSWORD_SUCCESSFULLY",
	ADMIN_DELETED_ACCOUNT_SUCCESSFULLY: "ADMIN_DELETED_ACCOUNT_SUCCESSFULLY",
	FILE_UPLOADED_SUCCESSFULLY: "FILE_UPLOADED_SUCCESSFULLY",
	ADMIN_CLEAR_NOTIFICATION: "ADMIN_CLEAR_NOTIFICATION",
	ADMIN_CLEAR_ALL_NOTIFICATION: "ADMIN_CLEAR_ALL_NOTIFICATION",
	ADMIN_ADD_ALGORITHEM_SUCCESSFULLY: "ADMIN_ADD_ALGORITHEM_SUCCESSFULLY",
	ADMIN_UPDATE_ALGORITHEM_SUCCESSFULLY: "ADMIN_UPDATE_ALGORITHEM_SUCCESSFULLY",
	ADMIN_DELETED_ALGORITHEM_SUCCESSFULLY: "ADMIN_DELETED_ALGORITHEM_SUCCESSFULLY",
	APP_VERSION_ADDSUCCESFULLY: "APP_VERSION_ADDSUCCESFULLY",
	DATA_NOT_FOUND: "DATA_NOT_FOUND",
	NOTIFICATION_SEND_TO_USER: "NOTIFICATION_SEND_TO_USER",
	QUERY_SUBMITTED: "QUERY_SUBMITTED",
	SUPER_ADMIN_REGISTER_SUCCESSFULLY: "SUPER ADMIN_REGISTER_SUCCESSFULLY",
	SUPER_ADMIN_LOGIN_SUCCESSFULLY: "SUPER ADMIN_LOGIN_SUCCESSFULLY",
	SUPER_ADMIN_BLOCKED: "SUPER ADMIN_BLOCKED",
	SUPER_ADMIN_LOGOUT_SUCCESSFULLY: "SUPER ADMIN_LOGOUT_SUCCESSFULLY",
	SUPER_ADMIN_PROFILE_UPDATED_SUCCESSFULLY: "SUPER_ADMIN_PROFILE_UPDATED_SUCCESSFULLY",
	SUPER_ADMIN_CHANGED_PASSWORD_SUCCESSFULLY: "SUPER_ADMIN_CHANGED_PASSWORD_SUCCESSFULLY",
	SUPER_ADMIN_CLEAR_NOTIFICATION: "SUPER_ADMIN_CLEAR_NOTIFICATION",
	SUPER_ADMIN_CLEAR_ALL_NOTIFICATION: "SUPER_ADMIN_CLEAR_ALL_NOTIFICATION",
	ADMIN_ADD_SUCCESSFULLY: "ADMIN_ADD_SUCCESSFULLY",
	ADMIN_PROFILE_UPDATED_SUCCESSFULLY: "ADMIN_PROFILE_UPDATED_SUCCESSFULLY",
	ADMIN_NOT_FOUND: "ADMIN_NOT_FOUND",
	APP_SETTING_ALREADY_EXIST: "APP_SETTING_ALREADY_EXIST",
	APP_SETTING_ADDED_SUCESSFULLY: "APP_SETTING_ADDED_SUCESSFULLY",
	CREDENTIALS_ADDED_SUCESSFULLY: "CREDENTIALS_ADDED_SUCESSFULLY",
	CREDENTIALS_ACTIVE_SUCESSFULLY: "CREDENTIALS_ACTIVE_SUCESSFULLY",
	CREDENTIALS_NOT_FOUND: "CREDENTIALS_NOT_FOUND",
	OTHER_CREDENTIALS_ACTIVE: "OTHER_CREDENTIALS_ACTIVE",
	CURRENT_CREDENTIALS_ALREADY_ACTIVE: "CURRENT_CREDENTIALS_ALREADY_ACTIVE",
	ADMIN_ID_NOT_VALID: "ADMIN_ID_NOT_VALID",
	DRIVER_UPDATED: "DRIVER_UPDATED",
	DRIVER_INVALID: "DRIVER_INVALID",
	DRIVER_BLOCKED: "DRIVER_BLOCKED",
	DRIVER_REGISTER_SUCCESSFULLY: "DRIVER_REGISTER_SUCCESSFULLY",
	DRIVER_LOGOUT_SUCCESSFULLY: "DRIVER_LOGOUT_SUCCESSFULLY",
	DRIVER_LOGIN_SUCCESSFULLY: "DRIVER_LOGIN_SUCCESSFULLY",
	DRIVER_PASSWORD_CHANGED: "DRIVER_PASSWORD_CHANGED",
	DRIVER_OTP_SENT: "DRIVER_OTP_SENT",
	DRIVER_OTP_INVALID: "DRIVER_OTP_INVALID",
	DRIVER_OTP_VERIFIED: "DRIVER_OTP_VERIFIED",
	BACK_DATE_NOT_ALLOWED: "BACK_DATE_NOT_ALLOWED",
	INVALID_DOMAIN: "INVALID_DOMAIN",
	INVALID_TASK_ID: "INVALID_TASK_ID",
	RATING_ADDED_SUCCESSFULLY: "RATING_ADDED_SUCCESSFULLY",
	DRIVER_FIRST_NAME_ALREADY_EXISTS: "DRIVER_FIRST_NAME_ALREADY_EXISTS",
	DRIVER_LAST_NAME_ALREADY_EXISTS: "DRIVER_LAST_NAME_ALREADY_EXISTS",
	DRIVER_PROFILE_UPDATED_SUCCESSFULLY: "DRIVER_PROFILE_UPDATED_SUCCESSFULLY",
	PHONE_NUMBER_NOT_MATCHED_EXISTS: "PHONE_NUMBER_NOT_MATCHED_EXISTS",
	DRIVER_NOT_FOUND: "DRIVER_NOT_FOUND",
	Driver_BLOCKED: "Driver_BLOCKED",
	USER_CHANGED_PASSWORD_SUCCESSFULLY: "USER_CHANGED_PASSWORD_SUCCESSFULLY",
	DRIVER_CHANGED_PASSWORD_SUCCESSFULLY:"DRIVER_CHANGED_PASSWORD_SUCCESSFULLY",
	OTP_CODE_SEND_YOUR_PHONE_NUMBER:"OTP_CODE_SEND_YOUR_PHONE_NUMBER",
	CONFIRM_PASSWORD_NOT_MATCHED_WITH_PASSWORD:"CONFIRM_PASSWORD_NOT_MATCHED_WITH_PASSWORD",
	VEHICLE_NUMBER_ALREADY_EXISTS:"VEHICLE_NUMBER_ALREADY_EXISTS",
	ADD_VEHICLE_DETAILS_SUCCESSFULLY: "ADD_VEHICLE_DETAILS_SUCCESSFULLY",
};
module.exports = {
	MESSAGES: MESSAGES
};