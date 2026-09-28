import express from "express";

import GetAll_Series_Controllers from "../../controller/SeriesControllers/GetAll_Series_Controllers/getAll_Series_Controllers.js";
import GetOne_Series_Controllers from "../../controller/SeriesControllers/GetOne_Series_Controllers/getOne_Series_Controllers.js";

const route = express.Router()

route.get("/series/all" , GetAll_Series_Controllers)
route.get("/series/:slug" , GetOne_Series_Controllers)

export default route