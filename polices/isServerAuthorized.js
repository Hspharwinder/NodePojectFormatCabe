const Services = require('../services/redis');
const config = require('config');
const universalFunction=require('../lib/universal-function');
const appConstant = require("../constant");
const appMessages = require("../langs");
const statusCodeList = require("../statusCodes");
const messageList = require("../messages");

const constant = appConstant.constant;
const statusCode = statusCodeList.statusCodes;
const messages = messageList.messages;

module.exports = async(req, res, next) => {
    try {
        if (req.headers ) {
            const url=req.url;
            const key=req.headers["key"] || null;
            req.headers["content-language"]=req.headers["content-language"] || constant.LANGUAGE_TYPE.ENGLISH;
            const keys=config.get('driverServerKey');
            const checkKeyExits=keys.includes(key);
                if (checkKeyExits) {
                    next();
                }else{
                    return universalFunction.unauthorizedResponse(req,res,messages.MESSAGES.INVALID_TOKEN);
                }
        } else {
            return universalFunction.unauthorizedResponse(req,res,messages.MESSAGES.INVALID_TOKEN);
        }  
    } catch (error) {
        return universalFunction.unauthorizedResponse(req,res);
    }
};