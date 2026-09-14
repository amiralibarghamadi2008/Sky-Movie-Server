import multer from "multer";
import fs from "fs"
import path from "path";

const storage = multer.diskStorage({  // اینجا برای همون بخش ذخیره سازی باید یه سری تنظیات انجام داد اولین آپشنی که دارم اینه که ما آیا از diskStorage استفاده کنیم یا memoryStorage که فرقشون توی حالت ذخیره سازی هستش 
    destination : function (req , file , callback) { // در این قسمت destination ما یه فانکشن داریم که این فانکشن خودش داری 3 پارمتر هستش پارامتر اول req یا ریکئوست هستش پارامتر دوم file هستش و سومی callBack هستش که ما برای که ما برای خروجی بهش نیاز داری 
        const directoryName = "./public/img" // اینجای توی یک متغیر محل خیره اسناد ررو میزاریم

        if (!fs.existsSync(directoryName)) { // اینجا میگیم آیا این مسیر که برای محل ذخیره سازی اصلا ساخته شده وجود دارد یا نه 
            fs.mkdirSync(directoryName ,  { recursive: true })
        }
        callback(null , directoryName) // و در آخر این مسیر رو برگردون گیر اصلی کدت دقیقاً اینجاست؛ یک باگ منطقی در ساختار شرطی (if/else) که باعث می‌شود وقتی پوشه وجود ندارد، چرخه مالتر تا ابد در هوا معلق بماند // 👈 دقیقاً اینجا هیچ کال‌بکی صدا زده نمی‌شود! 👈 کال‌بک در زندانِ else افتاده
    },
    filename : function (req , file , callback) { // fileName هم مثل destination یه فانکشن هست با همون پارامتر ها 
        callback(null , Date.now() + path.extname(file.originalname)) // در filename فقط ما یه callback داریم که توش میگم پسوند فایلی که برامون ارسال میشه و پارمتر file از توی فانکشن میگره رو به عنوان خروجی بده 
    }
}) 

const upload = multer({storage : storage}) // اینجا ما از پکیج استفاده می کنیم و میگیم میخایم از آپشن storage استفاده کنم  که برای  (حافظه ذخیره‌سازی) مشخص می‌کند که فایل‌های آپلود شده کجا و با چه نامی ذخیره شوند
