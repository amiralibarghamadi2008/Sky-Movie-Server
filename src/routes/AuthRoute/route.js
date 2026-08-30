import express from "express";

import SignInController from "../../controller/AuthControllers/SignInController/signInController.js";
import signOutController from "../../controller/AuthControllers/SignOutController/signOutController.js";

const route = express.Router()

route.post("/auth/sign-in" , SignInController)
route.post("/auth/sign-out" , signOutController)

export default route
