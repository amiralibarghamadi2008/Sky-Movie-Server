import express from "express";

// controller
import SendTicketController from "../../controller/TicketController/SendTicketController/sendTicketController.js";

// middleware's
import LoginOnly from "../../middleware/Auth/LoginOnly/loginOnly.js";

const route = express.Router();

route.post("/send-ticket", LoginOnly ,SendTicketController);

export default route;
