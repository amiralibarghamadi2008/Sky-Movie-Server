import express from "express";
import AuthenticatedOnly_Middleware from "../../middlewares/SignIn_Middleware/AuthenticatedOnly_Middleware/AuthenticatedOnly_Middleware.js";
import IsValidObjectId_Middleware from "../../middlewares/ValidationMiddlewares/IsValidObjectId.js";
import {
  createTicketController,
  getUserTicketsController,
  getAllTicketsController,
  getTicketByIdController,
  replyTicketController,
  updateTicketStatusController,
  updateTicketController,
  deleteTicketController,
} from "../../controllers/TicketControllers/TicketController.js";

const router = express.Router();

// کاربر: ثبت تیکت جدید و مشاهده تیکت‌های خود
router.post("/create", AuthenticatedOnly_Middleware, createTicketController);
router.get("/my", AuthenticatedOnly_Middleware, getUserTicketsController);

// ادمین: مشاهده تمام تیکت‌ها
router.get("/all", AuthenticatedOnly_Middleware, getAllTicketsController);

// مشاهده، پاسخ، ویرایش و حذف تیکت
router.get("/:id", AuthenticatedOnly_Middleware, IsValidObjectId_Middleware, getTicketByIdController);
router.post("/:id/reply", AuthenticatedOnly_Middleware, IsValidObjectId_Middleware, replyTicketController);
router.patch("/:id/status", AuthenticatedOnly_Middleware, IsValidObjectId_Middleware, updateTicketStatusController);
router.patch("/:id/edit", AuthenticatedOnly_Middleware, IsValidObjectId_Middleware, updateTicketController);
router.delete("/:id/delete", AuthenticatedOnly_Middleware, IsValidObjectId_Middleware, deleteTicketController);

export default router;
