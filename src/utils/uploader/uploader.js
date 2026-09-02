import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// __dirname = /app/src/utils/uploader/ → ../../ = /app/src/ → public/uploads/products
const uploadDir = path.resolve(__dirname, "../../public/uploads/products");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `product-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("فقط فایل‌های تصویری مجاز هستند!"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

const uploadMiddleware = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "images", maxCount: 10 },
]);

export function getAbsolutePathFromUrl(url) {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return null;
  const filename = path.basename(url);
  return path.join(uploadDir, filename);
}

export function deleteImageByUrl(url) {
  try {
    const filePath = getAbsolutePathFromUrl(url);
    if (!filePath) return false;
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

export function deleteImagesByUrls(urls) {
  if (!Array.isArray(urls) || urls.length === 0) {
    return { deleted: 0, failed: 0 };
  }
  let deleted = 0;
  let failed = 0;
  for (const url of urls) {
    if (deleteImageByUrl(url)) deleted++;
    else failed++;
  }
  return { deleted, failed };
}

export default uploadMiddleware;
