import express from "express";

// controller
import GetAll_Slider_Controllers from "../../controller/SliderControllers/GetAll_Slider_Controllers/getAll_Slider_Controllers.js";
import Create_Slider_Controllers from "../../controller/SliderControllers/Create_Slider_Controllers/create_Slider_Controllers.js";
import Delete_Slider_Controllers from "../../controller/SliderControllers/Delete_Slider_Controllers/delete_Slider_Controller.js";

// middleware's
import LoginOnly from "../../middleware/Auth/LoginOnly/loginOnly.js";
import AdminOnly from "../../middleware/Auth/AdminOnly/adminOnly.js";
import UploadImage from "../../utils/upload/multer/upload.js";

const { ErrorHandel } = UploadImage();

const route = express.Router()

route.get("/episode/all" , GetAll_Slider_Controllers)
route.post("/episode/create" , Create_Slider_Controllers)
route.delete("/episode/:id", LoginOnly , AdminOnly ,Delete_Slider_Controllers)
route.post("/uploader", LoginOnly , AdminOnly ,ErrorHandel);

export default route