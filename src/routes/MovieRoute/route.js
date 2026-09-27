import express from "express";

import GetAll_Movie_Controller from "../../controller/MovieControllers/GetAll_Movie_Controller/getAll_Movie_Controller.js";

const route = express.Router()

route.get("/movie/all", GetAll_Movie_Controller)

export default route