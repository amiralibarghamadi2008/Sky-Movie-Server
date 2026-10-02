import express from "express";

// controller
import Create_Article_Controllers from "../../controller/ArticleControllers/Create_Article_Controllers/create_Article_Controllers.js";
import Delete_Article_Controllers from "../../controller/ArticleControllers/Delete_Article_Controllers/delete_Article_Controller.js";
import GetAll_Article_Controllers from "../../controller/ArticleControllers/GetAll_Article_Controllers/getAll_Article_Controllers.js";
import GetOne_Article_Controllers from "../../controller/ArticleControllers/GetOne_Article_Controllers/getOne_Article_Controllers.js";
import Update_Article_Controllers from "../../controller/ArticleControllers/Update_Article_Controllers/update_Article_Controllers.js";

// middleware's
import LoginOnly from "../../middleware/Auth/LoginOnly/loginOnly.js";
import AdminOnly from "../../middleware/Auth/AdminOnly/adminOnly.js";
import UploadImage from "../../utils/upload/multer/upload.js";

const { ErrorHandel } = UploadImage();

const route = express.Router()

route.get("/article/all" , GetAll_Article_Controllers)
route.get("/article/:slug" , GetOne_Article_Controllers)
route.post("/article/create" , Create_Article_Controllers)
route.delete("/article/delete-article/:id", LoginOnly , AdminOnly ,Delete_Article_Controllers)
route.patch("/article/udate-article/:id", LoginOnly , AdminOnly ,Update_Article_Controllers)
route.post("/article/uploader", LoginOnly , AdminOnly ,ErrorHandel);

export default route