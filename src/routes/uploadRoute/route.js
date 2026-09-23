import express from "express";

import UploadImage from "../../utils/upload/multer/upload.js";

const route = express.Router();

const { ErrorHandel } = UploadImage();

route.post("/uploader", ErrorHandel);

export default route;
