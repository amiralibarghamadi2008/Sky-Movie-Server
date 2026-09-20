import express from "express";

import {uploadAvatarImg , AvatarField} from "../../utils/upload/Upload_Avatar_Image.js";

const route = express.Router()

route.post("/uploader" , uploadAvatarImg.fields(AvatarField) , (req , res) => {
    return res.status(200).json("عکس آواتار با موفقیت آپلود شد")
})

export default route
