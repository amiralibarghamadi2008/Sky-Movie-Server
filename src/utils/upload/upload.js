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

const upload = multer({storage : storage}) 
