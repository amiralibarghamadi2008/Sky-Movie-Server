import express from "express";

import SignInController from "../../controller/AuthControllers/SignInController/signInController.js";
import signOutController from "../../controller/AuthControllers/SignOutController/signOutController.js";
import authLimiter from "../../middleware/RateLimit/authLimiter.js";

const route = express.Router()

route.post("/auth/sign-in", authLimiter , SignInController)
route.post("/auth/sign-out" , signOutController)

export default route
