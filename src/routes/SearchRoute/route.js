import express from "express";

// controller
import GlobalSearchController from "../../controller/SearchControllers/GlobalSearchController/GlobalSearchController.js";
import TicketSearchController from "../../controller/SearchControllers/TicketSearchController/ticketSearchController.js";
import UserSearchController from "../../controller/SearchControllers/UserSearchController/UserSearchController.js";

// middleware's
import LoginOnly from "../../middleware/Auth/LoginOnly/loginOnly.js";
import AdminOnly from "../../middleware/Auth/AdminOnly/adminOnly.js";

const route = express.Router();

route.get("/global-search", GlobalSearchController);
route.get("/ticket-search", LoginOnly ,TicketSearchController);
route.get("/ticket-search", LoginOnly , AdminOnly ,UserSearchController);

export default route;
