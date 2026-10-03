import express from "express";

// controller's
import SignInController from "../../controller/AuthControllers/SignInController/signInController.js";
import signOutController from "../../controller/AuthControllers/SignOutController/signOutController.js";
import GetMeController from "../../controller/GetMeController/getMeController.js";
import MackeAdminController from "../../controller/MackeAdminController/mackeAdminController.js";
import DeleteAccountController from "../../controller/DeleteAccountController/deleteAccountController.js";
import BannedUserController from "../../controller/BanUserController/bannedUserController.js";

// middleware's
import authLimiter from "../../middleware/RateLimit/AuthLimiter/authLimiter.js";
import GuestOnly from "../../middleware/Auth/GuestOnly/guestOnly.js";
import LoginOnly from "../../middleware/Auth/LoginOnly/loginOnly.js";
import AdminOnly from "../../middleware/Auth/AdminOnly/adminOnly.js";

const route = express.Router();

route.get("/auth/get-me", LoginOnly, GetMeController);
route.delete("/auth/delete-account/:id", LoginOnly, DeleteAccountController);
route.post("/auth/sign-in", GuestOnly, authLimiter, SignInController);
route.post("/auth/sign-out", LoginOnly, signOutController);
route.patch("/auth/make-admin/:id", LoginOnly, AdminOnly, MackeAdminController);
route.patch("/auth/banned-user/:id", LoginOnly, AdminOnly, BannedUserController);

export default route;
