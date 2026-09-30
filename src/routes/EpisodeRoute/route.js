import express from "express";

// controller
import GetAll_Episode_Controllers from "../../controller/EpisodeControllers/GetAll_Episode_Controllers/getAll_Episode_Controllers.js";
import GetOne_Episode_Controllers from "../../controller/EpisodeControllers/GetOne_Episode_Controllers/getOne_Episode_Controllers.js";
import Create_Episode_Controllers from "../../controller/EpisodeControllers/Create_Episode_Controllers/create_Episode_Controllers.js";
import Delete_Episode_Controllers from "../../controller/EpisodeControllers/Delete_Episode_Controllers/delete_Episode_Controller.js";
import Update_Episode_Controllers from "../../controller/EpisodeControllers/Update_Episode_Controllers/update_Episode_Controllers.js";

// middleware's
import LoginOnly from "../../middleware/Auth/LoginOnly/loginOnly.js";
import AdminOnly from "../../middleware/Auth/AdminOnly/adminOnly.js";
import UploadImage from "../../utils/upload/multer/upload.js";

const { ErrorHandel } = UploadImage();

const route = express.Router()

route.get("/episode/all" , GetAll_Episode_Controllers)
route.get("/episode/:slug" , GetOne_Episode_Controllers)
route.post("/episode/create" , Create_Episode_Controllers)
route.delete("/episode/delete-episode/:id", LoginOnly , AdminOnly ,Delete_Episode_Controllers)
route.patch("/episode/udate-episode/:id", LoginOnly , AdminOnly ,Update_Episode_Controllers)
route.post("/episode/uploader", LoginOnly , AdminOnly ,ErrorHandel);

export default route