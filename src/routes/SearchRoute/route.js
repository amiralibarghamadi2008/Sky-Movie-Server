import express from "express";

// controller
import GlobalSearchController from "../../controller/SearchControllers/GlobalSearchController/GlobalSearchController.js";
import TicketSearchController from "../../controller/SearchControllers/TicketSearchController/ticketSearchController.js";

// middleware's
import LoginOnly from "../../middleware/Auth/LoginOnly/loginOnly.js";

const route = express.Router();

route.get("/global-search", GlobalSearchController);
route.get("/ticket-search", LoginOnly ,TicketSearchController);

export default route;
