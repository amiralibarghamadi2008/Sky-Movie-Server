import express from "express";

import SignInController from "../../controller/AuthControllers/SignInController/signInController.js";
import signOutController from "../../controller/AuthControllers/SignOutController/signOutController.js";
import authLimiter from "../../middleware/RateLimit/AuthLimiter/authLimiter.js";
import LoginOnly from "../../middleware/Auth/LoginOnly/loginOnly.js";

const route = express.Router()

route.post("/auth/sign-in", LoginOnly , authLimiter , SignInController)
route.post("/auth/sign-out", LoginOnly , signOutController)

export default route
