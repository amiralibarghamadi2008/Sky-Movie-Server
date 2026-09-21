import express from "express";

import UploadImage from "../../utils/upload/upload.js";

const route = express.Router();

const { ErrorHandel } = UploadImage("./src/public/image");

route.post("/uploader", ErrorHandel);

export default route;
