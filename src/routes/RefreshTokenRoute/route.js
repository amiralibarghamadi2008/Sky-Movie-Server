import express from "express";

// controller
import RefreshTokenController from "../../controller/RefreshTokenController/refreshTokenController.js";
 
const route = express.Router()

route.post("/auth/refreh-token" , RefreshTokenController)

export default route