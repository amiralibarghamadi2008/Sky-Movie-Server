import express from "express";

// controller
import SendTicketController from "../../controller/TicketController/SendTicketController/sendTicketController.js";
import ShowAllTicketController from "../../controller/TicketController/ShowAllTicketController/showAllTicketController.js";

// middleware's
import LoginOnly from "../../middleware/Auth/LoginOnly/loginOnly.js";
import AdminOnly from "../../middleware/Auth/AdminOnly/adminOnly.js";

const route = express.Router();

route.post("/send-ticket", LoginOnly ,SendTicketController);
route.get("/get-all-ticket", LoginOnly, AdminOnly ,ShowAllTicketController);

export default route;
