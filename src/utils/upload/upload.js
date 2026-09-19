import multer from "multer";
import fs from "fs"
import path from "path";

const storage = multer.diskStorage({ 
    destination : function (req , file , callback) { 
        const directoryName = "./public/img" 

        if (!fs.existsSync(directoryName)) { 
            fs.mkdirSync(directoryName ,  { recursive: true })
        }
        callback(null , directoryName) 
    },
    filename : function (req , file , callback) { 
        callback(null , Date.now() + path.extname(file.originalname)) 
    }
}) 

const fileFilter = function (req , file , callback) { // برای اینکه ما بیایم بگیم یه فیلتر و ولیدیشنی باشه برای مواردی که آپلود میشه باید یه همچین متغیری بسازیم که یه فانکشن میگیره با همون پارامتر ها 
    if (file.mimetype === "image/png" || file.mimetype ===  "image/jpeg" || file.mimetype ===  "image/webp") {  // در اینجا با استفاده از عبارت mimetype میگیم اگر فالی ارسال شد باید یکی از این فرمت ها رو داشته باشه وگرنه قبول نمیشه 
        callback(null , true) // اینجا هم اشاره به این میشه که فایل اگر با این فرمت های بالا باشه قبول میشه 
    }else {
        req.message = "عکس آپلودی باید در یکی از فرمت های webp یا jpg یا png باشد"  // فرستادن خطا
        callback(null , false) // در غیر این صورت نه 
    }
}

const upload = multer({storage , fileFilter}) 

export default upload