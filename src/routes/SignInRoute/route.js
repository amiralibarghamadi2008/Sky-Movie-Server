import express from "express";

import SignInController from "../../controller/SignInController/signInController.js";

const route = express.Router()

route.post("/sign-in" , SignInController)

export default route
