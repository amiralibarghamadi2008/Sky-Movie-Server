import express from "express";

import UploadImage from "../../utils/upload/upload.js";

const route = express.Router();

const { UploadImg, Fields, ErrorHandel} = UploadImage("./src/public/img");

route.post("/uploader", UploadImg.fields(Fields), (req, res) => {
    ErrorHandel(req , res)
});

export default route;
