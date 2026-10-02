import express from "express";

// controller
import GetAll_Series_Controllers from "../../controller/SeriesControllers/GetAll_Series_Controllers/getAll_Series_Controllers.js";
import GetOne_Series_Controllers from "../../controller/SeriesControllers/GetOne_Series_Controllers/getOne_Series_Controllers.js";
import Create_Series_Controllers from "../../controller/SeriesControllers/Create_Series_Controllers/create_Series_Controllers.js";
import Delete_Series_Controllers from "../../controller/SeriesControllers/Delete_Series_Controllers/delete_Series_Controller.js";
import Update_Series_Controllers from "../../controller/SeriesControllers/Update_Series_Controllers/update_Series_Controllers.js";

// middleware's
import LoginOnly from "../../middleware/Auth/LoginOnly/loginOnly.js";
import AdminOnly from "../../middleware/Auth/AdminOnly/adminOnly.js";
import UploadImage from "../../utils/upload/multer/upload.js";

const { ErrorHandel } = UploadImage();

const route = express.Router()

route.get("/series/all" , GetAll_Series_Controllers)
route.get("/series/:slug" , GetOne_Series_Controllers)
route.post("/series/create" , Create_Series_Controllers)
route.delete("/series/delete-series/:id", LoginOnly , AdminOnly ,Delete_Series_Controllers)
route.patch("/series/udate-series/:id", LoginOnly , AdminOnly ,Update_Series_Controllers)
route.post("/series/uploader", LoginOnly , AdminOnly ,ErrorHandel);

export default route