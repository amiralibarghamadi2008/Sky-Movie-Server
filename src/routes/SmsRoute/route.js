import express from "express";

// controller
import SendSmsController from "../../controller/SmsControllers/SendSmsController/sendSmsController.js";


// middleware's
import authLimiter from "../../middleware/RateLimit/AuthLimiter/authLimiter.js"
 
const route = express.Router()

route.post("/auth/send-sms" ,  authLimiter ,SendSmsController)
// route.post("/episode/create" , Create_Slider_Controllers)


export default route