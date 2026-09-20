import express from "express";

import {upload , field} from "../../utils/upload/Upload_Avatar_Image.js";

const route = express.Router()

route.post("/uploader" , upload.fields(field) , (req , res) => {
    return res.status(200).json("عکس آواتار با موفقیت آپلود شد")
})

export default route
