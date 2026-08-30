import express from "express";

import SmsController from "../../controller/SmsControllers/SendSmsController/SendSmsController.js";
import Verify_Controllers from "../../controller/SmsControllers/VerifySmsController/VerifySmsController.js";
import authLimiter from "../../middleware/RateLimit/authLimiter.js";

const route = express.Router()

route.post("/send-sms" , authLimiter ,SmsController)
route.post("/verify-sms" , authLimiter ,Verify_Controllers)

export default route