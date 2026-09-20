import multer from "multer";
import fs from "fs"
import path from "path";

const storage = multer.diskStorage({ 
    destination : function (req , file , callback) { 
        const directoryName = "./src/public/img" 

        if (!fs.existsSync(directoryName)) { 
            fs.mkdirSync(directoryName ,  { recursive: true })
        }
        callback(null , directoryName) 
    },
    filename : function (req , file , callback) { 
        callback(null , Date.now() + "_" + file.filename + path.extname(file.originalname)) 
    }
}) 

const fileFilter = function (req , file , callback) { 
    let acceptFile = false

    if (file.fieldname === "Avatar") {
      if (file.mimetype === "image/png" || file.mimetype ===  "image/jpeg" || file.mimetype ===  "image/webp") {  
        acceptFile = true
      }
    }

    callback (null, acceptFile)
}

const field = [{
    name:  "Avatar",
    maxCount : 1
}]

const upload = multer({storage , fileFilter}) 

export  {upload , field}
