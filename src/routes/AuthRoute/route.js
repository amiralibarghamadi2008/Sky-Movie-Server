import express from "express";

import SignInController from "../../controller/AuthControllers/SignInController/signInController.js";
import signOutController from "../../controller/AuthControllers/SignOutController/signOutController.js";
import GetMeController from "../../controller/GetMeController/getMeController.js";
import authLimiter from "../../middleware/RateLimit/AuthLimiter/authLimiter.js";
import GuestOnly from "../../middleware/Auth/GuestOnly/guestOnly.js"
import LoginOnly from "../../middleware/Auth/LoginOnly/loginOnly.js"

const route = express.Router()

route.post("/auth/sign-in", GuestOnly, authLimiter, SignInController);
route.post("/auth/sign-out", LoginOnly, signOutController);
route.get("/auth/get-me", LoginOnly, GetMeController);

export default route
