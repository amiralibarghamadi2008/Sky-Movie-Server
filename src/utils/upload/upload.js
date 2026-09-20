import multer from "multer";
import fs from "fs";
import path from "path";

export default function UploadImage(image) {
  try {
    const storage = multer.memoryStorage();

    const fileFilter = function (req, file, callback) {
      let acceptFile = false;

      if (
        file.fieldname === "AvatarUser" ||
        file.fieldname === "mainImageMovie" ||
        file.fieldname === "imagesMovie" ||
        file.fieldname === "mainImageSeries" ||
        file.fieldname === "imagesSeries" ||
        file.fieldname === "imageSlider" ||
        file.fieldname === "imageArticle"
      ) {
        if (
          file.mimetype === "image/png" ||
          file.mimetype === "image/jpeg" ||
          file.mimetype === "image/webp"
        ) {
          acceptFile = true;
        }
      }

      callback(null, acceptFile);
    };

    const Fields = [
      {
        name: "AvatarUser",
        maxCount: 1,
      },
      {
        name: "mainImageMovie",
        maxCount: 1,
      },
      {
        name: "imagesMovie",
        maxCount: 5,
      },
      {
        name: "mainImageSeries",
        maxCount: 1,
      },
      {
        name: "imagesSeries",
        maxCount: 5,
      },
      {
        name: "imageSlider",
        maxCount: 5,
      },
      {
        name: "imageArticle",
        maxCount: 1,
      },
    ];

    const ErrorHandel = function (req, res) {
      const uploadMiddleware = UploadImg.fields(Fields);

      uploadMiddleware(req, res, function (error) {
        if (error) {
          return res.status(400).json({
            success: false,
            message: `آپلود عکس با خطا مواجه شد: ${error}`,
          });
        }

        if (!fs.existsSync(image)) {
          fs.mkdirSync(image, { recursive: true });
        }

        Object.values(req.files).forEach((fileList) => {
          fileList.forEach((file) => {
            const baseName = path.parse(file.originalname).name;

            const ext = path.extname(file.originalname);

            const uniqueFilename = `${baseName}_${Date.now()}_${ext}`;

            fs.writeFileSync(image + "/" + uniqueFilename, file.buffer);
          });
        });

        return res.status(200).json({
          success: true,
          message: "آپلود با موفقیت انجام شد",
          files: req.files,
        });
      });
    };

    const UploadImg = multer({
      storage,
      fileFilter,
      limits: { fileSize: 5 * 1024 * 1024 },
    });

    return { ErrorHandel };
  } catch (error) {
    throw new Error(error.message);
  }
}
