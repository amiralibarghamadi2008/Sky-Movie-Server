import express from "express";

import SmsController from "../../controller/SmsControllers/SendSmsController/SendSmsController.js";
import Verify_Controllers from "../../controller/SmsControllers/VerifySmsController/VerifySmsController.js";

const route = express.Router()

route.post("/send-sms" , SmsController)
route.get("/verify-sms" , Verify_Controllers)

export default route