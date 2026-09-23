// multer
import multer from "multer";

// cloud storage
import createS3Client from "../s3/s3.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";

// use a S3 const
const S3 = createS3Client();

export default function UploadImage() {
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

    const UploadImg = multer({
      storage,
      fileFilter,
      limits: { fileSize: 5 * 1024 * 1024 },
    });

    const ErrorHandel = function (req, res) {
      const uploadMiddleware = UploadImg.fields(Fields);

      try {
        uploadMiddleware(req, res, async function (error) {
          if (error) {
            return res.status(400).json({
              success: false,
              message: `آپلود عکس با خطا مواجه شد: ${error}`,
            });
          }

          const uploadedFiles = [];

          for (const fileList of Object.values(req.files)) {
            for (const file of fileList) {
              const params = {
                Bucket: process.env.PARSPACK_BUCKET_NAME,
                Key: file.originalname,
                Body: file.buffer,
                ContentType: file.mimetype,
              };

              const command = new PutObjectCommand(params);

              await S3.send(command);

              uploadedFiles.push({
                fieldname: file.fieldname,
                key: file.originalname,
                url: `${process.env.PARSPACK_ENDPOINT}/${file.originalname}`,
              });
            }
          }

          return res.status(200).json({
            success: true,
            message: "آپلود با موفقیت انجام شد",
            files: req.files,
          });
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: `خطا لطفا اگر از IP ایران استفاده نمی کنید برای آپلود عکس به IP ایران برگردین: ${cloudError.message}`,
        });
      }
    };

    return { ErrorHandel };
  } catch (error) {
    throw new Error(error.message);
  }
}
