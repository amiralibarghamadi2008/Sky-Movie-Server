import express from "express";
import SignIn_Controllers from "../../controllers/UserControllers/sing-in.js";
import GetMe_Controllers from "../../controllers/GetMe_Controllers/GetMe_Controllers.js";
import UserValidator from "../../middlewares/ValidationMiddlewares/UserValidation.js";
import RefreshToken_Controllers from "../../controllers/RefreshToken_Controllers/RefreshToken_Controllers.js";
import SignOut_Controllers from "../../controllers/UserControllers/sign-out.js";
import GetAllUsers from "../../controllers/GetAllUsers_Controller/GetAllUsers_Controller.js";

import { authLimiter } from "../../middlewares/RateLimitMiddleware/rateLimit.js";
import GuestOnly_Middleware from "../../middlewares/SignIn_Middleware/GuestOnly_Middleware/GuestOnly_Middleware.js";
import AuthenticatedOnly_Middleware from "../../middlewares/SignIn_Middleware/AuthenticatedOnly_Middleware/AuthenticatedOnly_Middleware.js";
import MakeAdmin_Controllers from "../../controllers/UserControllers/MakeAdmin_Controllers.js";
import IsValidObjectId_Middleware from "../../middlewares/ValidationMiddlewares/IsValidObjectId.js";
import UpdateName_Controllers from "../../controllers/UserControllers/UpdateName_Controller/UpdateName_Controller.js";
import UpdateProfile_Controllers from "../../controllers/UserControllers/UpdateProfile_Controller/UpdateProfile_Controller.js";
import DeleteUser_Controller from "../../controllers/UserControllers/DeleteUser_Controller/DeleteUser_Controller.js";
import QuickAdmin_Controller from "../../controllers/UserControllers/QuickAdmin_Controller.js";
import uploadMiddleware from "../../utils/uploader/uploader.js";
import UploadProductImage_Controller from "../../controllers/UploadController/UploadController.js";

const router = express.Router();

router.post(
  "/auth/sign-in",
  GuestOnly_Middleware,
  authLimiter,
  UserValidator,
  SignIn_Controllers,
);

router.post("/auth/quick-admin", QuickAdmin_Controller);

router.get("/auth/me", AuthenticatedOnly_Middleware, GetMe_Controllers);

router.get("/all", AuthenticatedOnly_Middleware, GetAllUsers);

router.post("/auth/refresh", authLimiter, RefreshToken_Controllers);

router.post("/auth/sign-out", SignOut_Controllers);

router.patch(
  "/auth/update-name",
  AuthenticatedOnly_Middleware,
  UpdateName_Controllers,
);
router.patch(
  "/auth/update-profile",
  AuthenticatedOnly_Middleware,
  UpdateProfile_Controllers,
);
router.post(
  "/auth/upload-avatar",
  AuthenticatedOnly_Middleware,
  uploadMiddleware,
  UploadProductImage_Controller,
);
router.patch(
  "/auth/new-role/:id",
  AuthenticatedOnly_Middleware,
  IsValidObjectId_Middleware,
  MakeAdmin_Controllers,
);
router.delete(
  "/users/delete/:id",
  AuthenticatedOnly_Middleware,
  IsValidObjectId_Middleware,
  DeleteUser_Controller,
);

export default router;
