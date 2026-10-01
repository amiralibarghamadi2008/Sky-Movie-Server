import express from "express";

// controller
import SendSmsController from "../../controller/SmsControllers/SendSmsController/sendSmsController.js";
import VerifyOtpCodeController from "../../controller/SmsControllers/VerifySmsController/VerifySmsController.js";

// middleware's
import authLimiter from "../../middleware/RateLimit/AuthLimiter/authLimiter.js"
 
const route = express.Router()

route.post("/auth/send-sms" ,  authLimiter ,SendSmsController)
route.post("/auth/verify-sms" , VerifyOtpCodeController)


export default route