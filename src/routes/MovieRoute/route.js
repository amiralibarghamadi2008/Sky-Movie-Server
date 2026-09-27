import express from "express";

import GetAll_Movie_Controller from "../../controller/MovieControllers/GetAll_Movie_Controller/getAll_Movie_Controller.js";
import GetOne_Movie_Controller from "../../controller/MovieControllers/GetOne_Movie_Controller/getOne_Movie_Controller.js";
import Create_Movie_Controller from "../../controller/MovieControllers/Create_Movie_Controller/create_Movie_Controller.js";
import LoginOnly from "../../middleware/Auth/LoginOnly/loginOnly.js";
import UploadImage from "../../utils/upload/multer/upload.js";

const { ErrorHandel } = UploadImage();

const route = express.Router();

route.get("/movie/all", GetAll_Movie_Controller);
route.get("/movie/:slug", GetOne_Movie_Controller);
route.post("/movie/create", LoginOnly ,Create_Movie_Controller);
route.post("/uploader", LoginOnly ,ErrorHandel);

export default route;