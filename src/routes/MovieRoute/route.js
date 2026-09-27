import express from "express";

import GetAll_Movie_Controller from "../../controller/MovieControllers/GetAll_Movie_Controller/getAll_Movie_Controller.js";
import GetOne_Movie_Controller from "../../controller/MovieControllers/GetOne_Movie_Controller/getOne_Movie_Controller.js";

const route = express.Router()

route.get("/movie/all", GetAll_Movie_Controller)
route.get("/movie/:slug", GetOne_Movie_Controller)

export default route