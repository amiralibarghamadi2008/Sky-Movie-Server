import express from "express";

import upload from "../../utils/upload/upload.js";

const route = express.Router()

route.post("/uploader" , upload.array("images" , 5) , (req , res) => {
    return res.status(200).json("عکس ها با موفقیت آپلود شد")
})

export default route
