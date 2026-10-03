import express from "express";

// controller
import RefreshTokenController from "../../controller/RefreshTokenController/refreshTokenController.js";
 
const route = express.Router()

route.post("/auth/send-sms" , RefreshTokenController)

export default route