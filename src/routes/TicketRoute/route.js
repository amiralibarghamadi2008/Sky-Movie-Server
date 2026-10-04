import express from "express";

// controller
import ShowAllTicketController from "../../controller/TicketController/ShowAllTicketController/showAllTicketController.js";
import ShowOneTicketController from "../../controller/TicketController/ShowOneTicketController/showOneTicketController.js";
import SendTicketController from "../../controller/TicketController/SendTicketController/sendTicketController.js";
import AnswerTicketController from "../../controller/TicketController/AnswerTicketController/answerTicketController.js";
import DeleteTicketController from "../../controller/TicketController/DeleteTicketController/deleteTicketController.js";
import UpdateTicketController from "../../controller/TicketController/UpdateTicketController/updateTicketController.js";

// middleware's
import LoginOnly from "../../middleware/Auth/LoginOnly/loginOnly.js";
import AdminOnly from "../../middleware/Auth/AdminOnly/adminOnly.js";

const route = express.Router();

route.get("/get-all-ticket", LoginOnly, AdminOnly ,ShowAllTicketController);
route.get("/get-one-ticket/:id", LoginOnly, AdminOnly ,ShowOneTicketController);
route.post("/send-ticket", LoginOnly ,SendTicketController);
route.post("/answer-ticket/:id", LoginOnly ,AnswerTicketController);
route.delete("/delete-ticket/:id", LoginOnly ,DeleteTicketController);
route.patch("/update-ticket/:id", LoginOnly ,UpdateTicketController);

export default route;
